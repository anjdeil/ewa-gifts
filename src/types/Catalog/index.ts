import { z } from "zod";

const CatalogSchema = z.object({
  _type: z.string(),
  image: z.string().url(),
  title: z.string().optional(),
  link_url: z.string().url(),
});

export type CatalogType = z.infer<typeof CatalogSchema>;
