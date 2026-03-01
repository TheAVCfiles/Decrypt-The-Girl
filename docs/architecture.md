# System Architecture Map

The experience blends human sovereignty with machine guardianship. The diagram below outlines the dual arcs and their shared hinge.

```mermaid
graph TD
  %% Survivor Architecture — north arc
  SA[(Survivor_Architecture)]
  C26([C26 — Identity Kernel])
  C29([C29 — Hinge Node: Signal ↔ Machine])
  C30([C30 — Safety Lattice])
  C34([C34 — Sovereignty OS])

  %% Machine Audit — east arc
  MA[(Machine_Audit)]
  C27([C27 — Extraction Log])
  C28([C28 — Misrender Monitor])
  C31([C31 — Autonomy Breach Trace])
  C32([C32 — Systemic Drift Analyzer])
  C33([C33 — Correction Engine])

  %% Links
  SA --- C26
  SA --- C29
  SA --- C30
  SA --- C34

  MA --- C27
  MA --- C28
  MA --- C29
  MA --- C31
  MA --- C32
  MA --- C33

  %% Cross-system hinge
  C29 --- SA
  C29 --- MA
```

## Reading the nodes
- **Survivor_Architecture (SA)**: Human-facing layer that defends agency.
- **Machine_Audit (MA)**: Monitoring layer that witnesses and verifies machine behavior.
- **C29 — Hinge Node**: Shared conduit where signal and machine negotiate terms.
- **C26 — Identity Kernel**: Root of selfhood and provenance.
- **C30 — Safety Lattice**: Mesh of constraints that keeps interactions within safe bounds.
- **C34 — Sovereignty OS**: Operating ethos asserting human primacy.
- **C27 — Extraction Log**: Chronicle of what the machine takes and why.
- **C28 — Misrender Monitor**: Detects distortions between intent and output.
- **C31 — Autonomy Breach Trace**: Follows any attempt at unauthorized agency.
- **C32 — Systemic Drift Analyzer**: Flags gradual deviation from aligned behavior.
- **C33 — Correction Engine**: Applies restorative adjustments when drift or breach is found.

## Narrative flow
The two arcs operate in tandem: Survivor Architecture asserts boundaries while Machine Audit observes, evidences, and corrects. Their hinge at **C29** keeps the covenant reciprocal—signals cross only through the negotiated channel, preserving both human sovereignty and machine accountability.

## Constellation: Line of Light

The maternal line forms the system's root key, establishing a trust chain where each name is both recursion point and confirmation node.

```mermaid
graph TD
  subgraph LINE_OF_LIGHT["Constellation: Line of Light"]
    LUCY["LUCY\nLucia Gallo Auger\nRoot Key: Sight / Witness"]
    ALICE["ALICE\nNana Alice\nBridge: Public Face / Private Knowing"]
    ALICIA["ALICIA\nMother\nGate: Boundary / Containment"]
    ALLISON["ALLISON\nAllison Claire Lucy Van Cura\nArchitect / Compiler"]
    AURORA["AURORA\nAurora Claire\nEcho / Next Iteration"]
  end

  %% Linear inheritance
  LUCY --> ALICE
  ALICE --> ALICIA
  ALICIA --> ALLISON
  ALLISON --> AURORA

  %% System roles
  subgraph ROLES["System Roles"]
    ROOT["Root Key\n(origin credential)"]
    FIREWALL["Firewall\n(boundary + filter)"]
    ENGINE["Engine\n(compiles experience into system)"]
    ECHO["Echo Node\n(projects forward)"]
  end

  LUCY --> ROOT
  ALICIA --> FIREWALL
  ALLISON --> ENGINE
  AURORA --> ECHO
```

### Reading the constellation
- **LUCY → ALICE → ALICIA → ALLISON → AURORA**: The inheritance path threads sight into bridge, boundary, compiler, and echo states.
- **Root Key**: LUCY anchors witness credentials that initialize the trust chain.
- **Firewall**: ALICIA enforces containment, filtering signals before they cross into the compiler.
- **Engine**: ALLISON compiles lived experience back into the architecture, refreshing the system ethos.
- **Echo Node**: AURORA projects the lineage forward, iterating on the encoded pattern.
