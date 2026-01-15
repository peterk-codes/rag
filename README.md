# RAG Knowledge Base Search

A semantic search engine built with Retrieval-Augmented Generation (RAG) architecture. Uses vector embeddings to find documents by meaning, not just keywords.

## Why This Matters for Utilities

Traditional keyword search fails when customers search "lower my bill" but documentation says "energy efficiency programs." Semantic search understands intent.

**Applications:**
- Customer self-service portals for rate plans and rebate programs
- Field technician access to equipment manuals and maintenance guides
- Internal search across safety procedures and compliance documents
- Smart grid documentation and operational procedures

## Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Express    │────▶│    Ollama    │────▶│   ChromaDB   │
│   Server     │     │  Embeddings  │     │ Vector Store │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                    │
       │            mxbai-embed-large            │
       │           (1024 dimensions)             │
       │                    │                    │
       ▼                    ▼                    ▼
   REST API          Text → Vectors       Similarity Search
```

## Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Runtime | Node.js + TypeScript | Type-safe backend |
| Embeddings | Ollama + mxbai-embed-large | Local vector generation |
| Vector DB | ChromaDB | Persistent similarity search |
| API | Express.js | REST endpoints |

## Project Structure

```
src/
├── config.ts        # Centralized configuration
├── db.ts            # ChromaDB client and helpers
├── embedder.ts      # Ollama embedding service
├── documents.ts     # Knowledge base (10 articles)
├── server.ts        # Express API + web UI
└── scripts/
    ├── ingest.ts    # Load documents into ChromaDB
    ├── list.ts      # View stored documents
    └── delete.ts    # Clear collection
```

## Quick Start

### Prerequisites
- Node.js 18+
- Docker
- Ollama

### Setup

```bash
# 1. Start ChromaDB
docker run -p 8000:8000 chromadb/chroma

# 2. Install Ollama from https://ollama.com, then:
ollama pull mxbai-embed-large

# 3. Install dependencies and run
npm install
npm run ingest
npm run serve
```

Open http://localhost:3000 and search for "energy savings"

## How It Works

### Document Ingestion
```
"Smart thermostats reduce energy consumption by 10-15%"
                          ↓
                   Ollama embeds text
                          ↓
            [0.23, -0.45, 0.12, ...] (1024 floats)
                          ↓
                  Stored in ChromaDB
```

### Query Processing
```
User: "how to lower electricity bill"
                          ↓
                   Ollama embeds query
                          ↓
            [0.21, -0.42, 0.15, ...] (1024 floats)
                          ↓
         ChromaDB finds nearest vectors
                          ↓
Returns: Smart Thermostat, LED Lighting, Solar Panel articles
```

### Why It Works

The embedding model maps semantically similar text to nearby points in vector space. "Lower electricity bill" and "energy savings" end up close together even though they share no words.

## API

### GET /search?q={query}

Returns top 3 matching documents.

**Request:**
```
GET /search?q=renewable%20energy
```

**Response:**
```json
[
  {
    "id": "5",
    "title": "Solar Panel ROI Analysis",
    "document": "Residential solar installations typically achieve ROI within 6-8 years...",
    "distance": 0.342
  }
]
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run ingest` | Embed and store documents |
| `npm run serve` | Start the search server |
| `npm run list` | Display stored documents |
| `npm run delete` | Clear all documents |

## Configuration

All settings in `src/config.ts`:

```typescript
export const CHROMA_URL = "http://localhost:8000";
export const COLLECTION_NAME = "knowledge-base";
export const EMBEDDING_MODEL = "mxbai-embed-large";
export const SEARCH_RESULTS = 3;
export const PORT = 3000;
```

## Embedding Model

**mxbai-embed-large** from Mixedbread AI:
- #1 on MTEB benchmark for open-source embedding models
- 1024-dimensional vectors
- Runs locally via Ollama (no API costs)
- Outperforms OpenAI's text-embedding-ada-002

## Sample Data

10 articles covering energy efficiency and AI/ML:

| Energy | AI/ML |
|--------|-------|
| Smart Thermostats | Machine Learning in Healthcare |
| LED Lighting | Natural Language Processing |
| Solar Panel ROI | Computer Vision in Manufacturing |
| Building Automation | Recommendation Engines |
| EV Charging | Predictive Maintenance |

## Production Considerations

| Concern | Solution |
|---------|----------|
| Scale | Chunk documents during ingestion |
| Latency | Redis caching for frequent queries |
| Availability | ChromaDB cluster with replication |
| Security | API authentication and rate limiting |

## License

MIT
