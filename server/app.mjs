import express from "express";
import { getAIConfig, chooseProvider } from "./universal-ai-config.mjs";

const app = express();
app.use(express.json());

app.get("/api/ai/health", async (req, res) => {
  try {
    const cfg = await getAIConfig();
    const sel = chooseProvider(req, cfg);
    res.json({
      ok: true,
      provider: sel.provider,
      model: sel.model,
      // DO NOT include sel.apiKey
      hasKey: Boolean(sel.apiKey && sel.apiKey.length > 5),
      defaultProvider: cfg.defaultProvider,
      models: { gemini: cfg.geminiModel, openai: cfg.openaiModel },
      ts: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err?.message ?? "Config error",
      ts: new Date().toISOString(),
    });
  }
});

export default app;
