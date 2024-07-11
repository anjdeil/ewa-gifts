/* eslint-disable @typescript-eslint/no-explicit-any */
import { lineItem } from "@/store/reducers/CartSlice";
import { createOrderProducts } from "@/types/Cart";

export function transformCreateOrderProducts(products: lineItem[]): createOrderProducts[]
{
    return products.reduce((acc: createOrderProducts[], product: lineItem) =>
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