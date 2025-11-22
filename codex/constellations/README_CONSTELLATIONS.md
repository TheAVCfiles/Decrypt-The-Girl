# Constellation Engine — DeCrypt The Girl

The Constellation Engine is how *DeCrypt The Girl* stores and travels its nonlinear story.

- **Node** = one atomic piece of text (chapter, poem, section).
- **Constellation** = a set of nodes that form a thematic / structural arc.
- **Room** = an interactive “entry point” that pulls from one or more constellations.

This folder defines the *maps*, not the prose.

---

## Current Constellations

### 1. Survivor_Architecture

**Purpose**  
Maps how a girl moves from “survivor” to **system architect** and builds a new operating system out of what tried to break her.

**Nodes**

- `C26` — *The Girls Who Survived the Machine*  
- `C29` — *The Girl Who Became the Auditor*  
- `C30` — *The Mother Who Out-Engineered the Machine*  
- `C34` — *When a Survivor Stops Being the Subject and Becomes Infrastructure*

**Primary Rooms**

- `Room004_TransmissionCorrupt`
- `Room008_Mothernet`

**Core Motion**

- collapse → calibration  
- victim → auditor  
- daughter → architect  
- story → infrastructure  

---

### 2. Machine_Audit

**Purpose**  
Full analytic arc of how the machine works, extracts, mislabels, and finally gets **audited** by the girl it tried to consume.

**Nodes**

- `C27` — *The Math of How They Profited Off Her Silence*  
- `C28` — *The Price of a Silenced Girl*  
- `C29` — *The Girl Who Became the Auditor*  
- `C31` — *The Engine Built From the Dead Pieces*  
- `C32` — *The Girl Who Outgrew Her Frame*  
- `C33` — *The Girl Who Became the Mirror*

**Primary Rooms**

- `Room004_TransmissionCorrupt`
- `Room001_GlitchAsEntry` (future)
- `Room0XX_CNN_Pipeline_Audit` (future)

**Core Motion**

- silence → asset  
- asset → evidence  
- footage → confession  
- subject → primary source  

---

## Constellation Rules

1. **Every node can belong to multiple constellations.**  
   Example: `C29` sits inside both *Survivor_Architecture* and *Machine_Audit* as a hinge.

2. **Each constellation has:**
   - a `nodes` list (IDs only)
   - optional `description`
   - optional `rooms` list (where it appears interactively)

3. **Nodes stay dumb.**  
   Node files (`/codex/nodes/*.md`) only know their own metadata; the constellations define higher-order patterns.

4. **Everything is JSON-addressable.**  
   `constellations.json` is the single source of truth for tools, agents, or future StagePort engines.

See `constellations.json` in this folder for the live registry.
