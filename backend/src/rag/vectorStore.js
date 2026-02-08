import { ChromaClient } from "chromadb";
import { embed } from "../llm/embedding.js";

const client = new ChromaClient();

const collection = await client.getOrCreateCollection({
    name: "rag_docs",
});

/**
 * Embed docs và lưu vào ChromaDB
 * @param {Array} docs - [{ pageContent, metadata }]
 */
export async function embedAndStore(docs) {
    for (let i = 0; i < docs.length; i++) {
        const embedding = await embed(docs[i].pageContent);

        await collection.add({
            ids: [`doc-${Date.now()}-${i}`],
            embeddings: [embedding],
            documents: [docs[i].pageContent],
        });
    }
}

/**
 * Search vector DB theo embedding
 * @param {Array} queryEmbedding
 */
export async function searchVector(queryEmbedding) {
    const result = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: 5,
    });
    return result;
}
