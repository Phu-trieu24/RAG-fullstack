# RAG Chat System (Node.js + React + ChromaDB)

A full-stack Retrieval-Augmented Generation (RAG) application that allows users to chat with PDF documents using a local LLM.

## Features
- PDF ingestion and chunking
- Semantic search with ChromaDB
- Local LLM inference using Ollama (LLaMA)
- Streaming responses
- React chat UI
- Dockerized (one command to run)

## Tech Stack
- Backend: Node.js, Express
- Frontend: React (Vite)
- Vector DB: ChromaDB
- LLM: LLaMA (via Ollama)
- Observability: Winston, Prometheus metrics
- Containerization: Docker, docker-compose

## How to Run

```bash
docker compose up --build

Then open http://localhost:5173

Ingest PDF
curl -X POST http://localhost:3001/api/ingest \
  -H "Content-Type: application/json" \
  -d '{ "filePath": "data/pdfs/sample.pdf" }'

Architecture

PDF → Chunk → Embedding → Vector DB
User Query → Retrieve → Prompt → LLM → Streamed Answer