import { typeProductType, variationsProductType } from "@/types/Shop";
import { filterByColorAndSize } from "./filterByColorAndSize";
import { filterByCurrentAttr } from "./filterByCurrentAttr";
import { generateProductSeoSchema } from "./generateProductSeoSchema";
import { ProductSeoType } from "@/types/seo";

interface ProductSeoSchemaType
{
    color: string | null;
    size: string | null;
}

export function getProductSeoSchema(reqUrl: string, product: typeProductType, domain: string): ProductSeoType | null
{
    if (!reqUrl)
    {
        console.error("Error: The provided URL in Product Page is invalid or does not exist. Please provide a valid URL to generate the Product SEO schema.");
        return null;
    }

    if (!product)
    {
        console.error("Error: The provided product info in Product Page is invalid or does not exist. Please provide a valid product to generate the Product SEO schema.");
        return null;
    }

    if (!domain.length)
    {
        console.error("Error: Please add correct frontend url in the .env file to generate the Product SEO schema.");
        return null;
    }

    const url = new URL(domain + reqUrl);
    const searchParams = url.searchParams;
    let productVariation: variationsProductType[] = [];

    const productParams: ProductSeoSchemaType = {
        color: null,
        size: null
    }

    if (searchParams.has('color'))
        productParams.color = searchParams.get('color');

    if (searchParams.has('size'))
        productParams.size = searchParams.get('size');

    if (productParams.color && productParams.size)
        productVariation = filterByColorAndSize(product.variations, productParams.color, productParams.size);
    else if (productParams.color)
        productVariation = filterByCurrentAttr(product.variations, productParams.color, 'color');
    else if (productParams.size)
        productVariation = filterByCurrentAttr(product.variations, productParams.size, 'size');

    if (productVariation.length)
        return generateProductSeoSchema(product, url.href, productVariation[0]);
    else
        return generateProductSeoSchema(product, url.href);
}