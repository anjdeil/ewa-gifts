import { BlogItemSchema, BlogStatisticSchema } from "@/types/Blog";
import { PageBuilderFullSectionsSchema } from "@/types/PageBuilder/PageBuilderFullSectionsSchema";
import { ProductSchema } from "@/types/Shop";
import { z } from "zod";

export const pageSchema = z.object({
    content: z.string(),
    id: z.number(),
    menu_order: z.number(),
    parent: z.number(),
    sections: z.array(PageBuilderFullSectionsSchema),
    slug: z.string(),
    status: z.string(),
    title: z.string(),
    type: z.string(),
});

const itemEnumSchemas = z.union([ProductSchema, pageSchema]);

export const responseSingleCustomApiSchema = z.object({
    data: z.object({
        item: itemEnumSchemas.nullable(),
    }),
    status: z.string(),
});

export const responseMultipleCustomApiSchema = z.object({
    data: z.object({
        items: z.array(BlogItemSchema),
        statistic: BlogStatisticSchema,
    }),
    status: z.string(),
});

export type pageType = z.infer<typeof pageSchema>;
export type responseSingleCustomApi = z.infer<
    typeof responseSingleCustomApiSchema
>;
export type responseMultipleCustomApi = z.infer<
    typeof responseMultipleCustomApiSchema
>;
