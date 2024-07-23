import { lineOrderItems } from "@/types";
import { transformColorByName } from "./transformColorByName";

export function transformCartItemName(cartItem: lineOrderItems): string
{
    if (cartItem?.parent_name)
    {
        const [, nameTail] = cartItem.name.split(cartItem.parent_name);
        if (nameTail)
        {
            const { label } = transformColorByName(nameTail);
            const [colorTail] = label ? label.split(',') : [''];
            return `${cartItem.parent_name} ${colorTail}`;
        }
    }
    return cartItem.name;
}