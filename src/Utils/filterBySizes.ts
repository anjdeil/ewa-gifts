import { defaultAttributesType, variationsProductType } from "@/types/Shop";

export function filterBySizes(variations: variationsProductType[]): defaultAttributesType[]
{
    const availableVariations: defaultAttributesType[] = [];
    variations.forEach(variation =>
    {
        const res = variation.attributes.filter(attr => attr.name === 'size');
        if (res.length)
            availableVariations.push(res[0]);
        else
            return null;
    });
    return availableVariations;
}