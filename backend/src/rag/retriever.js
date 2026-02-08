import { embed } from "../llm/embedding.js";
import { searchVector } from "./vectorStore.js";

/**
 * Lấy top-K docs liên quan cho query
 * @param {string} query
 */
export async function getRelevantDocs(query) {
    const queryEmbedding = await embed(query);
    const results = await searchVector(queryEmbedding);

    // Chuyển sang format { pageContent }
    return results.documents[0].map((text) => ({
        pageContent: text,
    }));
}
