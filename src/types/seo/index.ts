import { z } from "zod";

const OpenGraphSchema = z.object({
    description: z.string().nullable(),
    image: z.string().nullable(),
    image_id: z.number().nullable(),
    image_meta: z.object({
        alt: z.string(),
        filesize: z.number(),
        height: z.number().optional(),
        id: z.string().optional(),
        path: z.string().optional(),
        pixels: z.number(),
        size: z.string().optional(),
        type: z.string().optional(),
        url: z.string().optional(),
        width: z.number().optional(),
    }).nullable(),
    image_source: z.string().nullable(),
    title: z.string().nullable(),
});

const TwitterSchema = z.object({
    description: z.string().nullable(),
    image: z.string().nullable(),
    image_id: z.number().nullable(),
    image_source: z.string().nullable(),
    title: z.string().nullable(),
});

export const BotSchema = z.object({
    is_no_archive: z.boolean(),
    is_no_follow: z.boolean(),
    is_no_index: z.boolean()
});

export const SeoDataSchema = z.object({
    bot: BotSchema,
    breadcrumb_title: z.string().nullable(),
    description: z.string().nullable(),
    open_graph: OpenGraphSchema,
    reading_time_minutes: z.number().nullable(),
    title: z.string().nullable(),
    twitter: TwitterSchema
});

export interface ProductSeoType
{
    "@context": string;
    "@type": string;
    description: string;
    name: string;
    productID: string | number;
    brand: {
        "@type": string;
        name: string;
    };
    Image: string;
    offers: {
        "@type": string;
        availability: string;
        price: string | number | boolean;
        priceCurrency: string;
        eligibleQuantity: {
            value: number;
            unitCode: string;
            "@type": string[];
        };
        url: string;
    }[];
}

export type SeoDataType = z.infer<typeof SeoDataSchema>;