import { z } from "zod";

export const ProductOptionsSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
});

export const ProductAttributesSchema = z.object({
    id: z.number(),
    name: z.string(),
    options: z.array(ProductOptionsSchema),
    option: z.string().optional(),
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

export const variationsProductSchema = z.object({
    attributes: z.array(defaultAttributesSchema),
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
    variations: z.array(variationsProductSchema),
});

const ProductCardPropsSchema = z.object({
    product: ProductSchema,
});

export type ProductImagesType = z.infer<typeof productImagesSchema>;
export type ProductAttributesType = z.infer<typeof ProductAttributesSchema>;
export type variationsProductType = z.infer<typeof variationsProductSchema>;
export type ProductCardProps = z.infer<typeof ProductCardPropsSchema>;
export type ProductOptions = z.infer<typeof ProductOptionsSchema>;
export type defaultAttributesType = z.infer<typeof defaultAttributesSchema>;
export type simpleProduct = z.infer<typeof simpleProductSchema>;
export type typeProductType = z.infer<typeof ProductSchema>;