"""Utilities for performing Google Discovery Engine content searches.

This module wraps the Discovery Engine SearchRequest API to provide a
single helper function that returns a normalized dictionary containing
the extracted answers and summary text alongside document metadata.
"""
from __future__ import annotations

from typing import Any, Dict, List, Optional

try:  # pragma: no cover - optional dependency at runtime
    from google.cloud import discoveryengine  # type: ignore
except ImportError as exc:  # pragma: no cover - consumers must install dependency
    raise ImportError(
        "google-cloud-discoveryengine is required to use scripts.discovery_search"
    ) from exc


def _safe_struct_lookup(struct: Optional[Dict[str, Any]], key: str) -> str:
    """Return a key from a derived struct data dictionary when present."""
    if not struct:
        return ""
    value = struct.get(key, "")
    return value if isinstance(value, str) else ""


def search_content(
    client: "discoveryengine.SearchServiceClient",
    serving_config: str,
    query: str,
    *,
    page_size: int = 10,
    return_snippet: bool = False,
    include_citations: bool = False,
    max_extractive_answer_count: int = 3,
    max_extractive_segment_count: int = 3,
    summary_result_count: int = 3,
) -> Dict[str, Any]:
    """Execute a content search and normalize the Discovery Engine response.

    Args:
        client: An initialized ``SearchServiceClient``.
        serving_config: The fully qualified serving configuration resource name.
        query: The search query string.
        page_size: Maximum number of results to return per page.
        return_snippet: Whether to include textual snippets in the response.
        include_citations: Whether to include citations in the generated summary.
        max_extractive_answer_count: Maximum number of extractive answers per result.
        max_extractive_segment_count: Maximum number of extractive segments per result.
        summary_result_count: Number of segments to include in the summary output.

    Returns:
        A dictionary with two top-level keys:
            ``results``: A list of result dictionaries containing document
                metadata and extractive answers.
            ``summary``: The summary text returned by Discovery Engine, if any.
    """

    content_search_spec = discoveryengine.SearchRequest.ContentSearchSpec(
        snippet_spec=discoveryengine.SearchRequest.ContentSearchSpec.SnippetSpec(
            return_snippet=return_snippet
        ),
        extractive_content_spec=(
            discoveryengine.SearchRequest.ContentSearchSpec.ExtractiveContentSpec(
                max_extractive_answer_count=max_extractive_answer_count,
                max_extractive_segment_count=max_extractive_segment_count,
            )
        ),
        summary_spec=discoveryengine.SearchRequest.ContentSearchSpec.SummarySpec(
            summary_result_count=summary_result_count,
            include_citations=include_citations,
        ),
    )

    request = discoveryengine.SearchRequest(
        serving_config=serving_config,
        query=query,
        page_size=page_size,
        content_search_spec=content_search_spec,
        query_expansion_spec=discoveryengine.SearchRequest.QueryExpansionSpec(
            condition=discoveryengine.SearchRequest.QueryExpansionSpec.Condition.AUTO
        ),
        spell_correction_spec=discoveryengine.SearchRequest.SpellCorrectionSpec(
            mode=discoveryengine.SearchRequest.SpellCorrectionSpec.Mode.AUTO
        ),
    )

    response = client.search(request=request)

    results: List[Dict[str, Any]] = []
    for result in response:
        document = result.document
        derived_struct_data: Optional[Dict[str, Any]] = getattr(
            document, "derived_struct_data", None
        )
        results.append(
            {
                "id": document.name,
                "title": _safe_struct_lookup(derived_struct_data, "title"),
                "uri": _safe_struct_lookup(derived_struct_data, "link"),
                "extractive_answers": [
                    answer.content.text
                    for answer in getattr(result, "extractive_answers", []) or []
                ],
            }
        )

    summary_text = ""
    summary = getattr(response, "summary", None)
    if summary:
        summary_text = getattr(summary, "summary_text", "") or ""

    return {"results": results, "summary": summary_text}


__all__ = ["search_content"]
