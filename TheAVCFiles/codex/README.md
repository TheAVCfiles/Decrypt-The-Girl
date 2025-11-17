# Codex Content Layout

The `codex` folder organizes the narrative building blocks that power
future chatbot memory, constellation mapping, and interactive scenes.

- `nodes/` holds short, self-contained text shards.
- `chapters/` stores longer sequences that can be serialized into scrolls.
- `rooms/` contains set pieces and environmental descriptions.
- `constellations/` arranges thematic clusters linking related works.
- `manifest/` provides indexes or metadata describing how pieces connect.

Place new files in UTF-8 plain text or JSON so downstream tooling can
parse and remix them without dependencies.
