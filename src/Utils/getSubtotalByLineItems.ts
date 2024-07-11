import { lineOrderItems } from "@/types";

const getSubtotalByLineItems = (lineItems: lineOrderItems[]): number => {
    let subtotal = 0;

    lineItems.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        if (!Number.isNaN(itemSubtotal)) subtotal += itemSubtotal;
    });

    return subtotal;
}

export default getSubtotalByLineItems;