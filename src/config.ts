/**
 * Application configuration constants.
 * Centralized config makes it easy to change settings across the entire app.
 */

/** ChromaDB server URL */
export const CHROMA_URL = "http://localhost:8000";

/** Collection name for the knowledge base */
export const COLLECTION_NAME = "knowledge-base";

/** Ollama embedding model - Mixedbread AI's mxbai-embed-large (#1 on MTEB) */
export const EMBEDDING_MODEL = "mxbai-embed-large";

/** Number of search results to return */
export const SEARCH_RESULTS = 3;

/** Server port */
export const PORT = 3000;
