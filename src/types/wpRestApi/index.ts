import { z } from "zod";

export const wpRestApiPropsSchema = z.object({
    url: z.string(),
    params: z.record(z.union([z.string(), z.number()])).optional()
});

export type wpRestApiProps = z.infer<typeof wpRestApiPropsSchema>;