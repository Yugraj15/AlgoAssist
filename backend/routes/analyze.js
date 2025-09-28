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

// POST /api/analyze
router.post("/", async (req, res) => {
  try {
    const { code = "", mode = "explain" } = req.body;
    if (!code.trim()) {
      return res.status(400).json({ error: "Code is required" });
    }

    const prompt = createPrompt(code, mode);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(result.response.text());

    const algorithm = parsed.algorithm || null;

    const doc = await Snippet.create({
      code,
      mode,
      algorithm,
      aiResponse: parsed,
      raw: result.response.text(),
    });

    return res.json({ id: doc._id, code, mode, algorithm, aiResponse: parsed, raw: result.response.text() });
  } catch (err) {
    console.error("Analyze error", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;