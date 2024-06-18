import { useState, useCallback } from "react";
import { transformCreateOrderProducts } from "@/services/transformers/woocommerce/transformCreateOrderProducts";
import { setLineItemsIds } from "@/store/reducers/CurrentOrder";
import { useAppDispatch } from "@/hooks/redux";
import { useFetchUpdateOrderMutation } from "@/store/wooCommerce/wooCommerceApi";
import { transformLineItemsId } from "@/services/transformers/woocommerce/transformLineItemsId";
import { CartItem, transformDeleteOrderProductsType } from "@/types";
import { transformDeleteOrderProducts } from "@/services/transformers/woocommerce/transformDeleteOrderProducts";

export const useUpdateOrderWoo = () =>
{
    const dispatch = useAppDispatch();
    const [fetchUpdateOrder, { data: updatedOrder }] = useFetchUpdateOrderMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const updateOrder = useCallback(async (
        productLineIds: transformDeleteOrderProductsType,
        items: CartItem[],
        orderId: number) =>
    {
        setIsLoading(true);
        setError(null);

        const fetchUpdateOrderBody = {
            credentials: {
                line_items: [
                    ...transformDeleteOrderProducts(productLineIds),
                    ...transformCreateOrderProducts(items)
                ]
            },
            id: orderId
        };
        try
        {
            const createOrderData = await fetchUpdateOrder(fetchUpdateOrderBody).unwrap();
            const lineItemsIds = transformLineItemsId(createOrderData.line_items);

            dispatch(setLineItemsIds(lineItemsIds));
        } catch (error)
        {
            if (error instanceof Error)
            {
                setError(error.message);
            } else
            {
                setError('An unknown error occurred');
            }
            console.error(error, 'Failed to create order');
        } finally
        {
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, fetchUpdateOrder]);

    return { updateOrder, isLoading, error, updatedOrder };
};
