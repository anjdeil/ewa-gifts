import { ProductAttributesType, transColorsType } from "@/types";
import { transformColorByName } from "./transformColorByName";

export function transformColorsArray(attr: ProductAttributesType[] | []): transColorsType[] | []
{
    if (!attr)
        return [];
    const colors = attr.filter(attr => attr.name === "color");
    if (colors.length === 0)
        return [];
    const transColors = colors[0].options.map(color =>
    {
        const newColorObj = transformColorByName(color.name);
        newColorObj.slug = color.slug;
        return newColorObj;
    });
    return transColors;
}