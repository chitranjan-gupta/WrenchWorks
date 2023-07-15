import { createClient } from "next-sanity";
export const client = createClient({
  projectId: "ndix7yog",
  dataset: "production",
  apiVersion: "2023-07-14",
  useCdn: true,
});
