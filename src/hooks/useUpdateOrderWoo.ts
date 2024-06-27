import { useState } from "react";
import { transformCreateOrderProducts } from "@/services/transformers/woocommerce/transformCreateOrderProducts";
import { setLineItemsIds } from "@/store/reducers/CurrentOrder";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
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
    const { currentOrder: { orderId: id, productLineIds: liness } } = useAppSelector(state => state.currentOrderSlice);
    const updateOrder = async (
        productLineIds: transformDeleteOrderProductsType,
        items: CartItem[],
        orderId: number
    ) =>
    {
        setIsLoading(true);
        setError(null);

        try
        {
            console.log('start');
            const updateOrderData = await fetchUpdateOrder({
                credentials: {
                    line_items: [
                        ...transformDeleteOrderProducts(productLineIds),
                        ...transformCreateOrderProducts(items)
                    ]
                },
                id: orderId
            }).unwrap();
            console.log('middle');
            dispatch(setLineItemsIds(transformLineItemsId(updateOrderData.line_items)));
            console.log('finish');
        } catch (err)
        {
            if (err instanceof Error)
            {
                setError(err.message);
            } else
            {
                setError('An unknown error occurred');
            }
            console.error(err, 'Failed to update order');
        } finally
        {
            setIsLoading(false);
        }
    };

    return { updateOrder, isLoading, error, updatedOrder };
};
