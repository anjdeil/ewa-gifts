import { z } from "zod";

const BreadcrumbSchema = z.object({
    name: z.string(),
    url: z.string()
});

const BreadcrumbsSchema = z.object({ links: z.array(BreadcrumbSchema) });

export type BreadcrumbsProps = z.infer<typeof BreadcrumbsSchema>;
