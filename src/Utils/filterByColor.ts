import { variationsProductType } from "@/types";

export function filterByColor(variations: variationsProductType[], currentColor: string): variationsProductType[]
{
    return variations.filter(variation =>
        variation.attributes.some(attribute =>
            attribute.name === 'color' && attribute.option === currentColor
        )
    );
}
