const express = require("express");
const router = express.Router();
const Snippet = require("../models/Snippet");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function createPrompt(code, mode) {
  if (mode === "explain") {
    return `
You are an expert programmer teacher. 
Return a **strict JSON object** with:
{
  "explanation": "...",
  "summary": "..."
}

Code:
\`\`\`
${code}
\`\`\`
`;
  } else if (mode === "debug") {
    return `
You are an expert debugging assistant. 
Return a **strict JSON object** with:
{
  "issues": ["...", "..."],
  "explanation": "...",
  "fixedCode": "..."
}

Code:
\`\`\`
${code}
\`\`\`
`;
  } else {
    return `
You are an expert algorithm analyst. 
Return a **strict JSON object** with:
{
  "algorithm": "name of algorithm",
  "explanation": "...",
  "pseudocode": "...",
  "complexity": "..."
}

Code:
\`\`\`
${code}
\`\`\`
`;
  }
}

function tryParseJSON(text) {
  if (!text) return { raw: text };
  try {
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    if (first !== -1 && last !== -1 && last > first) {
      const js = text.slice(first, last + 1);
      return JSON.parse(js);
    }
    return { raw: text };
  } catch (err) {
    return { raw: text };
  }
}

// POST /api/analyze
router.post("/", async (req, res) => {
  try {
    const { code = "", mode = "explain" } = req.body;
    if (!code.trim()) {
      return res.status(400).json({ error: "Code is required" });
    }

    const prompt = createPrompt(code, mode);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    const parsed = tryParseJSON(rawText);

    const algorithm = parsed.algorithm || null;

    const doc = await Snippet.create({
      code,
      mode,
      algorithm,
      aiResponse: parsed,
    });

    return res.json({ id: doc._id, code, mode, algorithm, aiResponse: parsed, raw: rawText });
  } catch (err) {
    console.error("Analyze error", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
