import { ChromaClient } from "chromadb";
import { documents } from "../documents";
import { embed } from "../embedder";

const client = new ChromaClient({ path: "http://localhost:8000" });

await client.deleteCollection({ name: "knowledge-base" }).catch(() => {});
const collection = await client.createCollection({ name: "knowledge-base" });

const texts = documents.map(d => `${d.title}\n\n${d.content}`);
const embeddings = await embed(texts);

await collection.add({
  ids: documents.map(d => d.id),
  documents: texts,
  embeddings: embeddings,
  metadatas: documents.map(d => ({ title: d.title }))
});

console.log("Ingested", documents.length, "documents using Ollama mxbai-embed-large");
