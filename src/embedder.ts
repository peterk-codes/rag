/**
 * Embedding service using Ollama.
 * Converts text to vector embeddings for semantic search.
 */

import ollama from "ollama";
import { EMBEDDING_MODEL } from "./config";

/**
 * Converts an array of text strings into vector embeddings.
 *
 * @param texts - Array of strings to embed (documents or queries)
 * @returns Array of embedding vectors (1024 dimensions for mxbai-embed-large)
 */
export async function embed(texts: string[]): Promise<number[][]> {
  const embeddings: number[][] = [];

  for (const text of texts) {
    const response = await ollama.embed({ model: EMBEDDING_MODEL, input: text });
    embeddings.push(response.embeddings[0]);
  }

  return embeddings;
}
