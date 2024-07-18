import { ProductAttributesType, ProductOptions } from "@/types";
import { sortProductSizes } from "./sortProductSizes";

export function transformProductSizes(attributes: ProductAttributesType[]): ProductOptions[] | null 
{
    const sizes = attributes.find(attr => attr.name === "size");

    if (!sizes || !sizes.options)
        return null;

    return sortProductSizes(sizes.options);
}