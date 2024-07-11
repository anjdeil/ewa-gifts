import { transColorsType } from "@/types";
import getCssGradient from "@/Utils/getCssGradient";

export const transformColorByName = (untransformedName: string): transColorsType =>
{
    const colorNames: string[] = [];
    const colorHexs: string[] = [];

    const colorPairs = untransformedName.split(', ');
    colorPairs.forEach(colorPair =>
    {
        const [colorName, colorHex] = colorPair.split(" (");
        const cleanedColorHex = colorHex.slice(0, -1);

        colorNames.push(colorName);
        colorHexs.push(cleanedColorHex);
    });

    const combinedColorName = colorNames.join(', ');

    const cssColor: string = colorHexs.length > 1 ?
        getCssGradient(colorHexs) :
        colorHexs[0];

    return {
        label: combinedColorName,
        cssColor
    }
}