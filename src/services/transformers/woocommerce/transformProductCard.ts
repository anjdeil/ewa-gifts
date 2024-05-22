/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductType } from "@/types";
export const transformProductCard = (data: any[]): ProductType[] =>
{
    return data.map((product: any): ProductType =>
    {
        const colorAttribute = product.attributes.find((attr: any) => attr.slug === 'pa_kolor' && attr.options.length > 0);
        const sizes = product.attributes.find((attr: any) => attr.slug === 'pa_rozmiar' && attr.options.length > 0);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            slug: product.slug,
            price_html: product.price_html,
            image: product.images[0].src,
            attributes: colorAttribute ? [colorAttribute] : [],
            default_attr: '',
            isSized: sizes ? sizes : [],
            stock: product.stock_quantity,
        };
    });
};