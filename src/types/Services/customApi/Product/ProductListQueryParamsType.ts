import { z } from "zod";

const ProductListQueryParamsSchema = z.object({
    page: z.string().optional(),
    per_page: z.number().optional(),
    order_by: z.string().optional(),
    order: z.string().optional(),
    min_price: z.string().optional(),
    max_price: z.string().optional(),
    category: z.string().optional(),
    pa_supplier: z.string().optional(),
    pa_base_color: z.string().optional(),
    search: z.string().optional(),
    include: z.string().optional(),
    slugs: z.string().optional()
});

export type ProductListQueryParamsType = z.infer<typeof ProductListQueryParamsSchema>;