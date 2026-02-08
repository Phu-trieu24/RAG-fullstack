import fetch from "node-fetch";

/**
 * Gọi Ollama LLM, stream token về client
 * @param {string} prompt
 * @param {function} onToken - callback cho mỗi token
 */
export async function callLLM(prompt, onToken) {
    const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "llama3",
            prompt,
            stream: true,
        }),
    });

    for await (const chunk of res.body) {
        const lines = chunk.toString().split("\n");
        for (const line of lines) {
            if (!line) continue;
            try {
                const json = JSON.parse(line);
                if (json.response) onToken(json.response);
            } catch (e) {}
        }
    }
}
