import { z } from "zod";

// export const ProductMetaSchema = z.object({
//     id: z.number(),
//     key: z.string(),
//     value: z.any()
// });

// export const ProductCardAttributes = z.object({
//     id: z.number(),
//     name: z.string(),
//     options: z.array(z.string()),
//     position: z.number(),
//     slug: z.string(),
//     variation: z.boolean(),
//     visible: z.boolean(),
// });

// export const ProductCardDefaultAttributes = z.object({
//     id: z.number(),
//     name: z.string(),
//     option: z.string(),
// });

// export const ProductCardSchema = z.object({
//     attributes: z.array(ProductCardAttributes),
//     default_attributes: z.array(ProductCardDefaultAttributes),
//     categories: z.any(),
//     id: z.number(),
//     date: z.string(),
//     description: z.string(),
//     images: z.array(z.string()),
//     name: z.string(),
//     sale_price: z.string(),
//     price: z.number().nullable(),
//     price_html: z.string(),
//     sku: z.string(),
//     slug: z.string(),
//     variations: z.array(z.number()),
//     stock: z.number().nullable(),
//     image: z.string(),
//     default_attr: z.string(),
//     isSized: z.boolean(),
//     type: z.string(),
//     quantity: z.number().optional(),
//     metaData: z.array(ProductMetaSchema)
// });

// const ProductCardPropsSchema = z.object({
//     product: ProductCardSchema,
// });

// export type ProductType = z.infer<typeof ProductCardSchema>;
// export type ProductCardProps = z.infer<typeof ProductCardPropsSchema>;

export const ProductOptionsSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
});

export const ProductAttributesSchema = z.object({
    id: z.number(),
    name: z.string(),
    options: z.array(ProductOptionsSchema),
    slug: z.string(),
    variation: z.boolean(),
    visible: z.boolean(),
});

export const ProductCategorySchema = z.object({
    count: z.number(),
    description: z.string(),
    id: z.number(),
    name: z.string(),
    parent_id: z.number(),
    slug: z.string()
});

export const defaultAttributesSchema = z.object({
    id: z.number(),
    name: z.string(),
    option: z.string()
});

export const productImagesSchema = z.object({
    id: z.number(),
    name: z.string(),
    src: z.string()
});

export const PriceCirculationsSchema = z.object({
    type: z.string(),
    circulations: z.record(z.number())
});

export const simpleProductSchema = z.object({
    attributes: z.array(ProductAttributesSchema),
    categories: z.array(ProductCategorySchema),
    created: z.string(),
    default_attributes: z.array(defaultAttributesSchema),
    description: z.string(),
    id: z.number(),
    images: z.array(productImagesSchema),
    modified: z.string(),
    name: z.string(),
    price: z.union([z.number(), z.boolean()]),
    price_circulations: PriceCirculationsSchema,
    sku: z.string(),
    slug: z.string(),
    stock_quantity: z.union([z.number(), z.boolean()]),
    type: z.string(),
})

export const ProductSchema = simpleProductSchema.extend({
    variations: z.array(simpleProductSchema),
});

export type ProductOptions = z.infer<typeof ProductOptionsSchema>;
export type typeProductType = z.infer<typeof ProductSchema>;