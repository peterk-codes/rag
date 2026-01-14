/**
 * Delete script - removes all documents from the collection.
 * Run with: npm run delete
 */

import { getCollection } from "../db";
import { COLLECTION_NAME } from "../config";

const collection = await getCollection();
const all = await collection.get();

if (all.ids.length === 0) {
  console.log("Collection is already empty");
} else {
  await collection.delete({ ids: all.ids });
  console.log(`Deleted ${all.ids.length} documents from ${COLLECTION_NAME}`);
}
