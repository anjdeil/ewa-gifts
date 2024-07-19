import { ProductAttributesType, transColorsType } from "@/types";
import { transformColorByName } from "./transformColorByName";

export function transformColorsArray(attr: ProductAttributesType[] | []): transColorsType[] | null
{
    if (!attr || attr.length === 0)
    {
        return null;
    }

    const colors = attr.filter(attribute => attribute.name === "color");
    if (colors.length === 0)
    {
        return null;
    }

    if (!colors[0].options || colors[0].options.length === 0)
    {
        return null;
    }

    const transColors = colors[0].options.map(color =>
    {
        const newColorObj = transformColorByName(color.name);
        newColorObj.slug = color.slug;
        return newColorObj;
    });
    return transColors;
}