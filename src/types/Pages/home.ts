import { z } from "zod";
import { pageSchema } from "../Services/customApi";

export const PagePropsSchema = z.object({
    page: pageSchema,
    isMain: z.boolean(),
    error: z.string()
})

export type PageProps = z.infer<typeof PagePropsSchema>;