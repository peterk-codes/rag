import { ChromaClient } from "chromadb";

const client = new ChromaClient({ path: "http://localhost:8000" });
const collection = await client.getCollection({ name: "knowledge-base" });

const all = await collection.get({ include: ["documents", "embeddings", "metadatas"] });

console.log(`Found ${all.ids.length} documents:\n`);

all.ids.forEach((id, i) => {
  console.log(`ID: ${id}`);
  console.log(`Title: ${all.metadatas?.[i]?.title}`);
  console.log(`Document: ${all.documents?.[i]?.substring(0, 100)}...`);
  console.log(`Embedding: [${all.embeddings?.[i]?.slice(0, 5).join(", ")}...] (${all.embeddings?.[i]?.length} dimensions)`);
  console.log("---");
});
