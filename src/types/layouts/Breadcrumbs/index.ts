import { z } from "zod";

export const BreadcrumbSchema = z.object({
    name: z.string(),
    url: z.string()
});

const BreadcrumbsSchema = z.object({ links: z.array(BreadcrumbSchema) });

export type BreadcrumbType = z.infer<typeof BreadcrumbSchema>;
export type BreadcrumbsProps = z.infer<typeof BreadcrumbsSchema>;
