import express from "express";
import { ingestPDF } from "../rag/ingestPdf.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { filePath } = req.body;

    try {
        await ingestPDF(filePath);
        res.json({ status: "PDF ingested successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to ingest PDF" });
    }
});

export default router;
