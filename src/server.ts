/**
 * Express server for knowledge base search.
 * Provides a web UI and REST API for semantic document search.
 * Run with: npm run serve
 */

import express from "express";
import { getCollection } from "./db";
import { embed } from "./embedder";
import { PORT, SEARCH_RESULTS } from "./config";

const app = express();
const collection = await getCollection();

/** Serves the search UI */
app.get("/", (_, res) => res.send(`
<!DOCTYPE html>
<html>
<head><title>Knowledge Base Search</title></head>
<body>
  <h1>Knowledge Base Search</h1>
  <input id="q" placeholder="Search..." style="width:300px;padding:8px">
  <button onclick="search()">Search</button>
  <div id="results"></div>
  <script>
    async function search() {
      const q = document.getElementById('q').value;
      const res = await fetch('/search?q=' + encodeURIComponent(q));
      const data = await res.json();
      document.getElementById('results').innerHTML = data.map(d =>
        '<div style="margin:20px 0;padding:10px;border:1px solid #ccc">' +
        '<h3>' + d.title + '</h3>' +
        '<p>' + d.document + '</p>' +
        '<small>Distance: ' + d.distance.toFixed(3) + '</small></div>'
      ).join('');
    }
  </script>
</body>
</html>
`));

/**
 * Search API endpoint.
 * @param q - Query string to search for
 * @returns Top matching documents with similarity scores
 */
app.get("/search", async (req, res) => {
  const query = String(req.query.q);
  const queryEmbedding = await embed([query]);

  const results = await collection.query({
    queryEmbeddings: queryEmbedding,
    nResults: SEARCH_RESULTS
  });

  const formatted = results.ids[0].map((id, i) => ({
    id,
    title: results.metadatas?.[0][i]?.title,
    document: results.documents?.[0][i],
    distance: results.distances?.[0][i]
  }));

  res.json(formatted);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
