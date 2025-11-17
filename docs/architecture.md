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
