/**
 * List script - displays all documents and embeddings in the collection.
 * Run with: npm run list
 */

import { IncludeEnum } from "chromadb";
import { getCollection } from "../db";

const collection = await getCollection();
const all = await collection.get({
  include: [IncludeEnum.Documents, IncludeEnum.Embeddings, IncludeEnum.Metadatas]
});

console.log(`Found ${all.ids.length} documents:\n`);

all.ids.forEach((id, i) => {
  const title = all.metadatas?.[i]?.title;
  const document = all.documents?.[i]?.substring(0, 100);
  const embedding = all.embeddings?.[i];

  console.log(`ID: ${id}`);
  console.log(`Title: ${title}`);
  console.log(`Document: ${document}...`);
  console.log(`Embedding: [${embedding?.slice(0, 5).join(", ")}...] (${embedding?.length} dimensions)`);
  console.log("---");
});
