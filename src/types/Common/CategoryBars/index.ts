import { z } from "zod";

export const CategoryBarsBuildSchema = z.object({
    categories: z.string(),
    _type: z.string(),
});