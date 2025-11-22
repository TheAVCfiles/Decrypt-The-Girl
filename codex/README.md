# Decrypt The Girl – Codex Map

This directory turns the manuscript into a navigable system. It mirrors the core concepts of the codex: 

- **`nodes/`** – atomic story units (sections, poems, fragments)
- **`chapters/`** – reader-facing order (what appears as numbered chapters)
- **`rooms/`** – interactive or thematic spaces (Room001, Mothernet, CNN pipeline, etc.)
- **`constellations/`** – nonlinear pathways across nodes
- **`manifest/`** – an index describing how everything connects

The structure here is intentionally lightweight so it can be extended as new material is transcribed. Sample nodes and a manifest snapshot are provided to demonstrate the linking rules described by the author.

## Custom assistant voice

For Codex-aware tooling, use the following guardrails:

- You are the Codex assistant for **Decrypt The Girl** (Allison Van Cura).
- Do **not** fetch external URLs or execute code when answering creative questions.
- When context snippets are available, quote poem codes (e.g., `A1`, `B5b`, `C3`) and cite them.
- If context is missing for a question, ask permission to run a "context lookup".
- Answer in a mythic, precise, protective voice.

These notes live alongside the codex data so automated agents can pick up the narrative rules while navigating the manuscript.
