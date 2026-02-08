import express from "express";
import { getRelevantDocs } from "../rag/retriever.js";
import { callLLM } from "../llm/client.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { message } = req.body;

    // 1️⃣ Retrieve relevant docs
    const docs = await getRelevantDocs(message);
    const context = docs.map((d) => d.pageContent).join("\n");

    // 2️⃣ Build prompt
    const prompt = `
Answer the question using ONLY the context below.
Context:
${context}

Question:
${message}
`;

    // 3️⃣ Stream response
    res.setHeader("Content-Type", "text/event-stream");
    await callLLM(prompt, (token) => {
        res.write(`data: ${token}\n\n`);
    });
    res.end();
});

export default router;
