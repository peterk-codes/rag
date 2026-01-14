import { ChromaClient } from "chromadb";

const client = new ChromaClient({ path: "http://localhost:8000" });
const collection = await client.getCollection({ name: "knowledge-base" });

const all = await collection.get();
if (all.ids.length === 0) {
  console.log("Collection is already empty");
} else {
  await collection.delete({ ids: all.ids });
  console.log("Deleted", all.ids.length, "documents from knowledge-base");
}
