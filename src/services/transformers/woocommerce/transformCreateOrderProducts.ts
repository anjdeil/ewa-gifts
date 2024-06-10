/* eslint-disable @typescript-eslint/no-explicit-any */
import { createOrderProducts } from "@/types/Cart";

export function transformCreateOrderProducts(products: any): createOrderProducts[]
{
    return products.reduce((acc, product: any) =>
    {
        if (product.type === 'variable')
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