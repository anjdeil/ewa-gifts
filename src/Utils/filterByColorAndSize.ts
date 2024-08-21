import { variationsProductType } from "@/types/Shop";

export function filterByColorAndSize(variations: variationsProductType[], currentColor: string, currentSize: string): variationsProductType[]
{
    const filteredVariations = variations.filter(variation =>
    {
        const hasColor = variation.attributes.some(attribute =>
            attribute.name === 'color' && attribute.option === currentColor
        );
        const hasSize = variation.attributes.some(attribute =>
            attribute.name === 'size' && attribute.option === currentSize
        )
        return hasColor && hasSize;
    });
    return filteredVariations;
}