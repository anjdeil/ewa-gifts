import { useState, useCallback } from "react";
import { transformCreateOrderProducts } from "@/services/transformers/woocommerce/transformCreateOrderProducts";
import { setCurrentOrder, setLineItemsIds } from "@/store/reducers/CurrentOrder";
import { useAppDispatch } from "@/hooks/redux";
import { useFetchCreateOrderMutation } from "@/store/wooCommerce/wooCommerceApi";
import { transformLineItemsId } from "@/services/transformers/woocommerce/transformLineItemsId";
import { CartItem } from "@/types";

export const useCreateOrderWoo = () =>
{
    const dispatch = useAppDispatch();
    const [fetchCreateOrder, { data: createdOrder }] = useFetchCreateOrderMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const createOrder = useCallback(async (items: CartItem[]) =>
    {
        setIsLoading(true);
        setError(null);
        const fetchCreateOrderBody = { line_items: transformCreateOrderProducts(items) };

        try
        {
            const createOrderData = await fetchCreateOrder(fetchCreateOrderBody).unwrap();
            const currentOrderId = createOrderData.id;
            const lineItemsIds = transformLineItemsId(createOrderData.line_items);

            localStorage.setItem('currentOrderItems', JSON.stringify(lineItemsIds));
            localStorage.setItem('currentOrderId', currentOrderId);

            dispatch(setCurrentOrder(createOrderData.id));
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
    }, [dispatch, fetchCreateOrder]);

    return { createOrder, isLoading, error, createdOrder };
};
