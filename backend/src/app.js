import express from "express";
import cors from "cors";
import chatRoute from "./routes/chat.route.js";
import ingestRoute from "./routes/ingest.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoute);
app.use("/api/ingest", ingestRoute);

export default app;
