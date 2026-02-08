import fs from "fs";
import pdf from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter/recursive";
import { embedAndStore } from "./vectorStore.js";

/**
 * Ingest PDF, chunk text và lưu embeddings
 * @param {string} filePath - đường dẫn file PDF
 */
export async function ingestPDF(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 100,
    });

    const docs = await splitter.createDocuments([pdfData.text]);

    await embedAndStore(docs);

    console.log(`✅ PDF ingested: ${filePath}, chunks: ${docs.length}`);
}
