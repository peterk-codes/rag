# AI-Powered Knowledge Base Search Engine

A production-ready Retrieval-Augmented Generation (RAG) application demonstrating semantic search capabilities using vector embeddings, built with modern TypeScript, LangChain, and ChromaDB.

## Executive Summary

This application showcases an intelligent document retrieval system that understands the *meaning* behind search queries rather than relying on simple keyword matching. When a user searches for "energy savings," the system returns contextually relevant articles about smart thermostats, LED lighting, solar panels, and building automation—even if those exact words don't appear in the query.

This technology has direct applications in:
- **Customer Service Portals**: Enable customers to find relevant rate plans, rebate programs, and energy efficiency resources using natural language
- **Internal Knowledge Management**: Help employees quickly locate technical documentation, safety procedures, and regulatory guidelines
- **Smart Grid Documentation**: Semantic search across equipment manuals, maintenance logs, and operational procedures

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Interface                           │
│                    (Browser-based Search)                        │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Express.js API Server                       │
│                  (Query Processing & Response)                   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LangChain Orchestration                       │
│           (Embedding Generation & Vector Operations)             │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     OpenAI Embeddings API                        │
│              (text-embedding-3-small Model)                      │
│         1536-dimensional semantic vector generation              │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ChromaDB Vector Database                      │
│        (Persistent Storage & Similarity Search)                  │
│              Cosine similarity scoring                           │
└─────────────────────────────────────────────────────────────────┘
```

## How RAG Works

### The Problem with Traditional Search

Traditional keyword search fails when:
- Users search "reduce electricity bill" but documents contain "energy savings"
- Technical jargon differs from customer vocabulary
- Concepts are related but use different terminology

### The RAG Solution

**Retrieval-Augmented Generation (RAG)** solves this by:

1. **Document Ingestion**: Each document is converted into a high-dimensional vector (embedding) that captures its semantic meaning
2. **Query Processing**: User searches are converted to vectors using the identical embedding model
3. **Semantic Matching**: The system finds documents whose vectors are mathematically closest to the query vector
4. **Ranked Results**: Documents are returned sorted by semantic similarity score

This approach understands that "cutting power costs" and "reducing energy consumption" express the same intent.

## Key Technical Decisions

### Unified Embedding Model

Both document ingestion and query processing use the same embedding model (`text-embedding-3-small`). This ensures:
- **Consistency**: Documents and queries exist in the same vector space
- **Accuracy**: No semantic drift between indexing and retrieval
- **Simplicity**: Single model reduces operational complexity

### Vector Database Selection

ChromaDB was selected for:
- **Open Source**: No vendor lock-in
- **Persistence**: Embeddings survive restarts
- **Scalability**: Handles millions of vectors
- **Docker-native**: Easy deployment in containerized environments

### LangChain Integration

LangChain provides:
- **Abstraction**: Swap embedding providers without code changes
- **Best Practices**: Built-in chunking, batching, and error handling
- **Extensibility**: Easy integration with LLMs for answer generation

## Sample Knowledge Base

The included knowledge base contains 10 articles spanning:

| Category | Articles |
|----------|----------|
| Energy Efficiency | Smart Thermostats, LED Lighting, Solar Panel ROI, Building Automation, EV Charging Optimization |
| AI/ML Applications | Healthcare ML, NLP Applications, Computer Vision, Recommendation Engines, Predictive Maintenance |

### Example Search Results

**Query: "energy savings"**

Returns (ranked by relevance):
1. Smart Thermostat Energy Savings (Score: 0.89)
2. Building Automation Systems (Score: 0.84)
3. LED Lighting Efficiency (Score: 0.81)

**Query: "artificial intelligence in factories"**

Returns:
1. Computer Vision in Manufacturing (Score: 0.87)
2. Predictive Maintenance with IoT (Score: 0.82)
3. Machine Learning in Healthcare (Score: 0.71)

## Installation & Deployment

### Prerequisites

- Node.js 18+
- Docker
- OpenAI API key

### Quick Start

```bash
# Start ChromaDB vector database
docker run -p 8000:8000 chromadb/chroma

# Install dependencies
npm install

# Configure API access
set OPENAI_API_KEY=your-api-key

# Index documents (one-time)
npm run ingest

# Launch search server
npm run serve
```

Access the application at `http://localhost:3000`

## API Reference

### Search Endpoint

```
GET /search?q={query}
```

**Parameters:**
- `q` (required): Natural language search query

**Response:**
```json
[
  {
    "pageContent": "Document text...",
    "metadata": {
      "id": "1",
      "title": "Document Title"
    },
    "score": 0.892
  }
]
```

## Production Considerations

### Scaling for Enterprise

| Consideration | Recommendation |
|---------------|----------------|
| High Availability | Deploy ChromaDB cluster with replication |
| Document Volume | Implement chunking for documents >1000 tokens |
| Query Latency | Add Redis caching for frequent queries |
| Security | Implement API authentication and rate limiting |
| Monitoring | Add OpenTelemetry for observability |

### Cost Optimization

- **Embedding Caching**: Store embeddings to avoid recomputation
- **Batch Processing**: Ingest documents in batches during off-peak hours
- **Model Selection**: `text-embedding-3-small` balances cost and quality

## Extending the Application

### Adding LLM-Generated Answers

The current implementation returns relevant documents. To generate synthesized answers:

```typescript
import { ChatOpenAI } from "@langchain/openai";

const llm = new ChatOpenAI({ model: "gpt-4" });
const context = results.map(r => r.pageContent).join("\n\n");
const answer = await llm.invoke(`Based on: ${context}\n\nAnswer: ${query}`);
```

### Custom Document Sources

Replace the static document array with:
- Database connections (PostgreSQL, MongoDB)
- File system watchers (PDF, Word, Excel ingestion)
- API integrations (SharePoint, Confluence, ServiceNow)

## Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Runtime | Node.js + TypeScript | Type-safe server-side JavaScript |
| Framework | Express.js | Lightweight HTTP server |
| Orchestration | LangChain | AI/ML pipeline management |
| Embeddings | OpenAI text-embedding-3-small | Semantic vector generation |
| Vector Store | ChromaDB | Similarity search database |
| Containerization | Docker | Reproducible deployments |

## About This Project

This application demonstrates proficiency in:
- **AI/ML Engineering**: Vector embeddings, semantic search, RAG architecture
- **Full-Stack Development**: TypeScript, Node.js, REST APIs
- **Infrastructure**: Docker, database management, API integration
- **Software Design**: Clean architecture, minimal dependencies, production-ready patterns

Built to showcase practical AI solutions for enterprise knowledge management challenges.

---

*For questions or demonstrations, please contact the developer.*
