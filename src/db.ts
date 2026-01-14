/**
 * ChromaDB client and collection utilities.
 * Provides a singleton client and helper functions for collection access.
 */

import { ChromaClient, Collection } from "chromadb";
import { CHROMA_URL, COLLECTION_NAME } from "./config";

/** Singleton ChromaDB client instance */
export const client = new ChromaClient({ path: CHROMA_URL });

/**
 * Gets the knowledge base collection.
 * @throws Error if collection doesn't exist (run ingest first)
 */
export async function getCollection(): Promise<Collection> {
  return client.getCollection({ name: COLLECTION_NAME });
}

/**
 * Creates a fresh knowledge base collection.
 * Deletes existing collection if present.
 */
export async function createCollection(): Promise<Collection> {
  await client.deleteCollection({ name: COLLECTION_NAME }).catch(() => {});
  return client.createCollection({ name: COLLECTION_NAME });
}
