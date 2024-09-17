import { defaultAttributesType, variationsProductType } from "@/types/Shop";

export function filterOptionsBySize(variations: variationsProductType[]): defaultAttributesType[]
{
    const availableVariations: defaultAttributesType[] = [];
    variations.forEach(variation =>
    {
        if (variation.stock_quantity === 0) return;
        const res = variation.attributes.filter(attr => attr.name === 'size');
        if (res.length)
            availableVariations.push(res[0]);
        else
            return null;
    });
    return availableVariations;
}