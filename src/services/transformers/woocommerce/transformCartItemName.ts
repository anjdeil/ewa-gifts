import { lineOrderItems } from "@/types";
import { transformColorByName } from "./transformColorByName";

export function transformCartItemName(cartItem: lineOrderItems): string
{
    if (cartItem.variation_id)
    {
        let color = cartItem.meta_data.find(({ key }) => key === "pa_color")?.display_value;
        color = color && transformColorByName(color)?.label;

        const size = cartItem.meta_data.find(({ key }) => key === "pa_size")?.display_value;

        const options = [];
        if (color) options.push(color);
        if (size) options.push(size);

        if (options.length === 0 && cartItem.parent_name) return cartItem.parent_name;

        return `${cartItem.parent_name} — ${options.join(', ')}`;
    }
    return cartItem.name;
}