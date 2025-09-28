import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const fallbackBlueprint = {
  architecture: [
    {
      label: "Umbrella Brand",
      name: "AVC Servers & Systems Studio",
      description:
        "The executive constellation that governs every Myth Tech experiment, translating studio concepts into deployable, interoperable systems."
    },
    {
      label: "Core Invention",
      name: "Recursive Semantic OS",
      description:
        "A knowledge-first operating model that loops language, code, and choreography into self-describing runtimes. This is the canonical kernel powering each initiative."
    },
    {
      label: "Experience Layer",
      name: "GlisseOS™",
      description:
        "Poetic UX and ritualized flows for dancers, dreamers, and designers. Interfaces glide like choreography while remaining semantically precise."
    },
    {
      label: "Knowledge Layer",
      name: "Execlopedia™",
      description:
        "Executable encyclopedia for civil works. Every definition compiles into legal-ready pathways, policy scaffolding, and community onboarding kits."
    },
    {
      label: "Mythic Logic Layer",
      name: "MythOS™",
      description:
        "Recursive mathemetics for mythic storytelling. Encodes archetypal patterns, ritual logic, and symbolic data to drive narrative intelligence."
    },
    {
      label: "Technical Spine",
      name: "Semantic Spine™",
      description:
        "Specification-driven core that ensures every service, API, and data pipeline inherits the same recursive semantics from kernel to edge."
    }
  ],
  programs: [
    {
      name: "GlisseOS™",
      focus: "Poetic UX / Flow",
      description:
        "A responsive motion library and ritual design language that gives every AVC deployment a sense of choreographed ease. Ideal for live performances, immersive installations, and adaptive product surfaces.",
      signals: ["Embodied Interfaces", "Ritual Design", "Adaptive Motion"]
    },
    {
      name: "Execlopedia™",
      focus: "Civil Works / Executable Glossary",
      description:
        "Semantic knowledge base that compiles policy, governance, and civic vocabulary into executable modules. Enables municipalities and collectives to ship living documentation.",
      signals: ["Civic Infrastructure", "Procedural Memory", "Open Governance"]
    },
    {
      name: "MythOS™",
      focus: "Recursive Mythematics",
      description:
        "Story engine that maps folklore, dance notation, and symbolic mathematics into generative scripts. Equips Myth Tech ensembles with programmable mythology.",
      signals: ["Narrative Intelligence", "Symbolic Algebra", "Ensemble Readiness"]
    },
    {
      name: "Semantic Spine™",
      focus: "Technical Core",
      description:
        "Typed schemas, API choreography, and zero-drift data models. The Semantic Spine keeps every studio aligned while new performances deploy across the network.",
      signals: ["Spec-First Engineering", "Interoperable APIs", "Telemetry"]
    }
  ],
  timeline: [
    {
      phase: "Mythic Conception",
      year: "2019–2020",
      summary:
        "Define the Recursive Semantic OS thesis, sketch the AVC brand, and identify the four-fold studio constellation."
    },
    {
      phase: "Prototype Library",
      year: "2021–2022",
      summary:
        "Build executable glossaries, ritual UX prototypes, and symbolic maths playgrounds. Publish initial Myth Tech performances."
    },
    {
      phase: "Firebase Canon",
      year: "2023",
      summary:
        "Centralize taxonomies inside Firebase. Harmonize documentation, brand assets, and deployment pipelines under one project."
    },
    {
      phase: "Systems Release",
      year: "2024+",
      summary:
        "Launch production-ready services, share SDKs with partner studios, and invite collaborators into the recursive operating environment."
    }
  ],
  actions: [
    {
      title: "1. Configure Firebase Credentials",
      steps: [
        "Copy <code>firebase-config.example.js</code> to <code>firebase-config.js</code> and paste your Firebase web app credentials.",
        "Set the <code>default</code> project in <code>.firebaserc</code> or via <code>firebase use</code>."
      ]
    },
    {
      title: "2. Seed Firestore Collections (optional)",
      steps: [
        "Create a document <code>avc/base</code> with fields matching the architecture schema.",
        "Add collections <code>avcPrograms</code> and <code>avcTimeline</code> for dynamic program cards and roadmap entries."
      ]
    },
    {
      title: "3. Preview Locally",
      steps: [
        "Run <code>npm run start:firebase</code> to serve the control room from <code>firebase-app/</code>.",
        "Open <code>http://localhost:8080</code> and verify Firebase connectivity in the status badge."
      ]
    },
    {
      title: "4. Deploy to Firebase Hosting",
      steps: [
        "Authenticate with <code>firebase login</code>.",
        "Deploy using <code>npm run deploy</code> or <code>firebase deploy</code> for targeted sites."
      ]
    }
  ]
};

const clone = (value) => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
};

const architectureEl = document.getElementById("architecture");
const programsEl = document.getElementById("programs");
const timelineEl = document.getElementById("timeline");
const actionsEl = document.getElementById("actions");
const connectionStatusEl = document.getElementById("connectionStatus");
const footerYearEl = document.getElementById("footerYear");
const viewButtons = document.querySelectorAll(".control-button");

function setFooterYear() {
  const currentYear = new Date().getFullYear();
  footerYearEl.textContent = currentYear;
}

function updateStatus({ connected, projectId, message }) {
  if (!connectionStatusEl) return;
  const statusLines = [];

  statusLines.push(`<strong>${connected ? "Connected" : "Blueprint Mode"}</strong>`);
  if (projectId) {
    statusLines.push(`Project: ${projectId}`);
  }
  if (message) {
    statusLines.push(message);
  }

  connectionStatusEl.innerHTML = statusLines.join("<br>");
}

function renderArchitecture(cards, view = "grid") {
  if (!architectureEl) return;
  architectureEl.innerHTML = "";
  architectureEl.dataset.view = view;

  cards.forEach((card) => {
    const article = document.createElement("article");
    article.className = "architecture-card";
    const label = card.label || "Layer";
    const name = card.name || "Untitled System";
    const description =
      card.description || "Describe this architectural layer in Firestore.";
    article.innerHTML = `
      <p class="architecture-card__label">${label}</p>
      <h3>${name}</h3>
      <p>${description}</p>
    `;
    architectureEl.appendChild(article);
  });
}

function renderPrograms(programs) {
  if (!programsEl) return;
  programsEl.innerHTML = "";

  programs.forEach((program) => {
    const item = document.createElement("article");
    item.className = "program-card";
    item.setAttribute("role", "listitem");

    const name = program.name || "Untitled Initiative";
    const focus = program.focus || "Define focus";
    const description =
      program.description ||
      "Add descriptive copy in Firestore to broadcast this studio's role.";

    const signals = Array.isArray(program.signals) ? program.signals : [];
    const chips = signals
      .map((signal) => `<span class="program-card__chip">${signal}</span>`)
      .join("");

    const signalsMarkup = chips
      ? `<div class="program-card__signals">${chips}</div>`
      : "";

    item.innerHTML = `
      <header class="program-card__header">
        <h3 class="program-card__name">${name}</h3>
        <p class="program-card__focus">${focus}</p>
      </header>
      <p class="program-card__description">${description}</p>
      ${signalsMarkup}
    `;

    programsEl.appendChild(item);
  });
}

function renderTimeline(items) {
  if (!timelineEl) return;
  timelineEl.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "timeline__item";
    li.innerHTML = `
      <p class="timeline__phase">${item.phase || "Phase TBD"}</p>
      <p class="timeline__year">${item.year || ""}</p>
      <p class="timeline__summary">${item.summary || "Document this milestone in Firestore to surface it here."}</p>
    `;
    timelineEl.appendChild(li);
  });
}

function renderActions(actions) {
  if (!actionsEl) return;
  actionsEl.innerHTML = "";

  actions.forEach((action) => {
    const article = document.createElement("article");
    article.className = "action-card";

    const steps = action.steps
      .map((step) => `<li>${step}</li>`)
      .join("");

    article.innerHTML = `
      <h3 class="action-card__title">${action.title}</h3>
      <ol class="action-card__steps">${steps}</ol>
    `;

    actionsEl.appendChild(article);
  });
}

function handleViewToggle(cards) {
  let currentView = "grid";

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextView = button.dataset.view;
      if (currentView === nextView) return;

      currentView = nextView;
      viewButtons.forEach((btn) => {
        btn.setAttribute("aria-pressed", btn.dataset.view === currentView);
      });
      renderArchitecture(cards, currentView);
    });
  });
}

async function bootstrap() {
  setFooterYear();

  let data = clone(fallbackBlueprint);
  let firebaseConfig = null;
  let firebaseConnected = false;
  let projectId;

  try {
    const module = await import("./firebase-config.js");
    firebaseConfig = module.default || module.firebaseConfig;
  } catch (error) {
    console.info("firebase-config.js not found. Staying in blueprint mode.");
  }

  const configFilled = firebaseConfig
    ? Object.values(firebaseConfig).some((value) =>
        typeof value === "string" && value.trim() && !value.includes("YOUR_")
      )
    : false;

  if (configFilled) {
    try {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      projectId = firebaseConfig.projectId;

      const baseDoc = await getDoc(doc(db, "avc", "base"));
      if (baseDoc.exists()) {
        const payload = baseDoc.data();
        data.architecture = payload.architecture || data.architecture;
        data.actions = payload.actions || data.actions;
      }

      const programSnapshot = await getDocs(collection(db, "avcPrograms"));
      if (!programSnapshot.empty) {
        data.programs = programSnapshot.docs.map((docItem) => docItem.data());
      }

      const timelineSnapshot = await getDocs(collection(db, "avcTimeline"));
      if (!timelineSnapshot.empty) {
        data.timeline = timelineSnapshot.docs.map((docItem) => docItem.data());
      }

      firebaseConnected = true;
    } catch (error) {
      console.warn("Firebase connection failed. Using fallback blueprint.", error);
    }
  }

  renderArchitecture(data.architecture);
  renderPrograms(data.programs);
  renderTimeline(data.timeline);
  renderActions(data.actions);
  handleViewToggle(data.architecture);

  updateStatus({
    connected: firebaseConnected,
    projectId,
    message: firebaseConnected
      ? "Live data loaded from Firestore collections."
      : "Add Firebase credentials to synchronize studio data across deployments."
  });
}

bootstrap();
