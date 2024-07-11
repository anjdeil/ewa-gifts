import { ProductAttributesType, transColorsType } from "@/types";
import { transformColorByName } from "./transformColorByName";

export function transformColorsArray(attr: ProductAttributesType[]): transColorsType[] | boolean
{
    const colors = attr.filter(attr => attr.name === "color")[0].options;
    if (colors.length < 0) return false;
    const transColors = colors.map(color => transformColorByName(color.name));
    return transColors;
}