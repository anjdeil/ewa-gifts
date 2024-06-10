import { transformDeleteOrderProductsType } from "@/types";

export function transformDeleteOrderProducts(oldItemsIds: transformDeleteOrderProductsType)
{
    return (
        oldItemsIds.map(oldItemId => (
            {
                id: oldItemId,
                quantity: 0
            }
        ))
    )
}