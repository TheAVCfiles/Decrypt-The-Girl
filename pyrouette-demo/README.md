# Pyrouette Demo

This directory contains standalone demo and diagnostic surfaces for PyRouette visual testing.

## Lottie Diagnostic Panel

Open `diag-lottie.html` through a local static server or deployed static host to test Lottie animation loading, fallback behavior, and playback controls.

## Run locally

From the repository root, start a local static server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/pyrouette-demo/diag-lottie.html
```

A static server is recommended because browsers may block fetch requests when opening the HTML file directly from disk.

## Animation files

Place Lottie JSON files in:

```text
pyrouette-demo/assets/lottie/
```

The default local fallback animation is:

```text
pyrouette-demo/assets/lottie/diag-lottie.json
```

## Manifest format

Update `pyrouette-demo/assets/lottie/manifest.json` with one entry per animation:

```json
[
  {
    "id": "diag-pulse",
    "name": "Diagnostic Pulse",
    "path": "diag-lottie.json",
    "description": "Local fallback pulse animation for offline-safe diagnostics"
  }
]
```

Use paths relative to `pyrouette-demo/assets/lottie/` unless the path already starts with `./` or `../`.

## Diagnostic behavior

The panel:

- Loads animations through the manifest selector.
- Uses timeout-backed fetch requests.
- Displays explicit loading, success, and failure states.
- Respects reduced-motion preferences by disabling autoplay and looping.
- Falls back to a clear unavailable state if the animation or Lottie library cannot load.

## CDN note

`diag-lottie.html` loads `lottie-web` from unpkg first and then cdnjs if needed. If both CDNs are blocked, the panel shows a controlled error state instead of throwing an undefined-reference failure.
