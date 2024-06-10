/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartItem } from "@/types";
import { createOrderProducts } from "@/types/Cart";

export function transformCreateOrderProducts(products: CartItem[]): createOrderProducts[]
{
    return products.reduce((acc: createOrderProducts[], product: CartItem) =>
    {
        if (product.type === 'variable' && product.options)
        {
            product.options.forEach(item =>
            {
                acc.push({
                    product_id: product.id,
                    variation_id: item.id,
                    quantity: item.quantity
                })
            })
        } else
        {
            acc.push({
                product_id: product.id,
                quantity: product.quantity
            })
        }
        return acc;
    }, [])
}