# ChoreoCode v0.1 (Public Draft)

An early public draft of the **ChoreoCode** language developed by Allison Van Cura (AVC), built on the MythOS / AVC hybrid stack. The language maps dance concepts to code primitives so choreography can be expressed as programmable sequences.

## Language primitives
- `FIFTH()` — stable stance in a neutral state
- `PASSE(side)` — lifted processing mode on the specified side (e.g., `L` or `R`)
- `SOUS_SUS()` — compression and unification
- `SOUTENU(angle)` — rotation paired with review at a given angle
- `ECHO(payload)` — produces interpretive residue from the prior motion

## Core rules
1. Movement equals **State**
2. Transition equals **Function**
3. Axis equals **Stability**
4. Tempo equals **Logic**
5. Echo equals **Return**

## Example sequence
```chor
FIFTH()
PASSE(L)
SOUS_SUS()
SOUTENU(360)
ECHO("resolve")
```

## Positional annotations
- `AXIS(drift ≤ 8deg)` — axis stability allowance
- `TIMING(accuracy = ±0.05s)` — temporal precision band
- `SETTLE(≤ 7cm)` — landing tolerance
- `LINE(strict = ±5deg)` — line conformity

## Draft repository layout
```
ChoreoCode/
├── spec/
│   ├── choreocode_v0_1_spec.md
│   ├── syntax_reference.md
│   └── motion_primitives.json
├── compiler/
│   ├── parser.py
│   ├── interpreter.py
│   └── examples/
│       └── hello_world.chr
├── movement_library/
│   ├── classical_ballet/
│   ├── modern/
│   └── mythos_extensions/
├── docs/
│   ├── whitepaper.pdf
│   ├── pitch_deck/
│   └── academic_citations/
└── examples/
    ├── PyRouette_integration/
    ├── StageCred_bridge/
    └── Glissé Engine FSM/
```

The draft intentionally keeps the vocabulary compact, emphasizing stability (axis), timing (tempo), and interpretive return values (echo) as first-class concepts. Future iterations can extend the movement library and formalize the compiler interfaces listed above.
