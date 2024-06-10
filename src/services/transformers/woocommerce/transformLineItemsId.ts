import { lineOrderItems } from "@/types";

export function transformLineItemsId(lineItems: lineOrderItems[])
{
    return lineItems.map(lineItem => lineItem.id);
}