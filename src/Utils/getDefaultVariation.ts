import { defaultAttributesType, ProductAttributesType } from "@/types/Shop";

export function getDefaultVariation(
    attrName: string,
    attributes: ProductAttributesType[],
    default_attributes: defaultAttributesType[]
): string | null
{
    const attrId = attributes.find(attr => attr.name === attrName)?.id;
    if (!attrId) return null;

    const defaultAttrOption = default_attributes.find(attr => attr.id === attrId);

    if (defaultAttrOption && "option" in defaultAttrOption)
        return defaultAttrOption.option;
    else
        return null;
}