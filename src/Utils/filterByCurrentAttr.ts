import { variationsProductType } from "@/types/Shop";

type attrNameType = 'color' | 'size';

export function filterByCurrentAttr(variations: variationsProductType[], currentColor: string, attrName: attrNameType): variationsProductType[]
{
    return variations.filter(variation =>
        variation.attributes.some(attribute =>
            attribute.name === attrName && attribute.option === currentColor
        )
    );
}
