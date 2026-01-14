import ollama from "ollama";
import pMap from "p-map";

// Mixedbread AI's embedding model - #1 on MTEB leaderboard for open-source models
const MODEL = "mxbai-embed-large";

// Number of parallel embedding requests to Ollama
// Increase for faster processing (if your machine can handle it)
// Decrease if you're running out of memory
const CONCURRENCY = 5;

/**
 * Converts an array of text strings into vector embeddings using Ollama.
 *
 * Uses p-map for controlled concurrency - processes multiple texts in parallel
 * while respecting the CONCURRENCY limit to avoid overwhelming Ollama.
 *
 * @param texts - Array of strings to embed (documents or queries)
 * @returns Array of embedding vectors (each is number[] with 1024 dimensions for mxbai-embed-large)
 */
export async function embed(texts: string[]): Promise<number[][]> {
  let processed = 0;

  return pMap(texts, async (text: string) => {
    // Call Ollama's embedding endpoint
    const response = await ollama.embed({ model: MODEL, input: text });

    // Log progress every 100 documents or when complete
    processed++;
    if (processed % 100 === 0 || processed === texts.length) {
      console.log(`Progress: ${processed}/${texts.length} (${((processed / texts.length) * 100).toFixed(1)}%)`);
    }

    // Return the embedding vector for this text
    return response.embeddings[0];
  }, { concurrency: CONCURRENCY });
}
