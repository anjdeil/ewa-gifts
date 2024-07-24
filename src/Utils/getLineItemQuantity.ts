import { CartItem } from "@/types";

export function getLineItemQuantity(productId: number, lineItems: CartItem[]): number | null
{
    if (!lineItems) return null;
    const lineItem = lineItems.filter(item => item.product_id === productId);
    if (lineItem.length > 0)
    {
        return lineItem[0].quantity;
    } else
    {
        return null;
    }
}