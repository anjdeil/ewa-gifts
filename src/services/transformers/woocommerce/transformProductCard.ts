/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductType } from "@/types";
export const transformProductCard = (data: any[]): ProductType[] =>
{
    return data.map((product: any): ProductType =>
    {
        const colorAttribute = product.attributes.find((element: { slug: string; options: string | any[]; }) => element.slug === 'pa_color' && element.options.length > 0)?.options || [];
        const sizes = product.attributes.find((attr: any) => attr.slug === 'pa_rozmiar' && attr.options.length > 0);

        const images = product.images.map((image: any) => image.src);

        return {
            attributes: colorAttribute ? colorAttribute : [],
            categories: product.categories,
            id: product.id,
            date: product.date_created,
            description: product.description,
            images: images,
            name: product.name,
            sale_price: product.sale_price,
            price: product.price,
            price_html: product.price_html,
            sku: product.sku,
            slug: product.slug,
            stock: product.stock_quantity,
            image: product.images[0].src,
            default_attr: '',
            isSized: sizes ? sizes : [],
            type: product.type,
        };
    });
};