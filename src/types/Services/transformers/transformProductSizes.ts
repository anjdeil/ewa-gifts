import { defaultAttributesType, ProductAttributesType, ProductOptions } from "@/types";
import { sortProductSizes } from "../../../Utils/sortProductSizes";

export function transformProductSizes(attrArray: ProductAttributesType[] | defaultAttributesType[]): ProductOptions[] & defaultAttributesType[] | null
{
    if (!attrArray || attrArray.length === 0) return null;

    const simple = attrArray.filter(attr => "options" in attr);
    const variable = attrArray.filter(attr => "option" in attr);

    if (simple.length > 0)
    {
        const options = simple.filter(variation => variation.name === 'size');
        if (options.length > 0)
            return sortProductSizes(options[0].options);
    }

    if (variable.length > 0)
    {
        const options = variable.filter(variation => variation.name === 'size');
        if (options.length > 0)
            return sortProductSizes(options);
    }

    return [];
}
