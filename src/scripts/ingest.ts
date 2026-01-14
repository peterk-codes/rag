/**
 * Ingestion script - embeds documents and stores them in ChromaDB.
 * Run with: npm run ingest
 */

import { createCollection } from "../db";
import { documents } from "../documents";
import { embed } from "../embedder";
import { EMBEDDING_MODEL } from "../config";

const collection = await createCollection();

const texts = documents.map(d => `${d.title}\n\n${d.content}`);
const embeddings = await embed(texts);

await collection.add({
  ids: documents.map(d => d.id),
  documents: texts,
  embeddings,
  metadatas: documents.map(d => ({ title: d.title }))
});

console.log(`Ingested ${documents.length} documents using Ollama ${EMBEDDING_MODEL}`);
