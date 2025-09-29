const SUPPORTED_PROVIDERS = new Set(["openai", "gemini"]);

/**
 * Build the runtime configuration for the AI proxy. Environment variables are
 * used so the service can be deployed without modifying source control.
 *
 * @returns {Promise<object>} A promise that resolves with the normalised
 * configuration.
 */
export async function getAIConfig() {
  const desiredDefault = normaliseProvider(
    process.env.AI_DEFAULT_PROVIDER || process.env.AI_PROVIDER || "openai",
  );

  const config = {
    defaultProvider: desiredDefault || "openai",
    openaiModel: process.env.OPENAI_MODEL || "gpt-4o-mini", // sensible default
    geminiModel: process.env.GEMINI_MODEL || "gemini-1.5-flash",
    openaiApiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || "",
    geminiApiKey: process.env.GEMINI_API_KEY || process.env.GEMINI_KEY || "",
  };

  // If the default provider is unavailable (e.g. missing key) but the other is
  // configured, fall back automatically so callers always receive a viable
  // provider when possible.
  if (!providerHasKey(config, config.defaultProvider)) {
    const alt = config.defaultProvider === "gemini" ? "openai" : "gemini";
    if (providerHasKey(config, alt)) {
      config.defaultProvider = alt;
    }
  }

  return config;
}

/**
 * Determine which provider should satisfy the inbound request.
 *
 * @param {import("express").Request} req
 * @param {{
 *   defaultProvider: string;
 *   openaiModel: string;
 *   geminiModel: string;
 *   openaiApiKey?: string;
 *   geminiApiKey?: string;
 * }} cfg
 */
export function chooseProvider(req, cfg) {
  const requestProvider = normaliseProvider(
    firstString(req.query.provider) || firstString(req.headers["x-ai-provider"]),
  );

  let provider = requestProvider || cfg.defaultProvider || "openai";
  if (!SUPPORTED_PROVIDERS.has(provider)) {
    provider = cfg.defaultProvider;
  }

  // If the selected provider has no key, automatically fall back to the other
  // configured provider to keep the health endpoint meaningful.
  if (!providerHasKey(cfg, provider)) {
    const fallback = provider === "gemini" ? "openai" : "gemini";
    if (providerHasKey(cfg, fallback)) {
      provider = fallback;
    }
  }

  const requestedModel = firstString(req.query.model) || firstString(req.headers["x-ai-model"]);
  const model = resolveModel(provider, cfg, requestedModel);
  const apiKey = provider === "gemini" ? cfg.geminiApiKey : cfg.openaiApiKey;

  return { provider, model, apiKey };
}

function normaliseProvider(value) {
  if (!value || typeof value !== "string") {
    return undefined;
  }
  const lower = value.trim().toLowerCase();
  return SUPPORTED_PROVIDERS.has(lower) ? lower : undefined;
}

function firstString(value) {
  if (Array.isArray(value)) {
    return value.find((entry) => typeof entry === "string");
  }
  return typeof value === "string" ? value : undefined;
}

function resolveModel(provider, cfg, requestedModel) {
  if (requestedModel && typeof requestedModel === "string" && requestedModel.trim().length > 0) {
    return requestedModel.trim();
  }
  return provider === "gemini" ? cfg.geminiModel : cfg.openaiModel;
}

function providerHasKey(cfg, provider) {
  if (provider === "gemini") {
    return Boolean(cfg.geminiApiKey && cfg.geminiApiKey.length > 0);
  }
  return Boolean(cfg.openaiApiKey && cfg.openaiApiKey.length > 0);
}
