import { useState } from "react";
import { transformCreateOrderProducts } from "@/services/transformers/woocommerce/transformCreateOrderProducts";
import { setLineItemsIds } from "@/store/reducers/CurrentOrder";
import { useAppDispatch } from "@/hooks/redux";
import { useFetchUpdateOrderMutation } from "@/store/wooCommerce/wooCommerceApi";
import { transformLineItemsId } from "@/services/transformers/woocommerce/transformLineItemsId";
import { CartItem, transformDeleteOrderProductsType } from "@/types";
import { transformDeleteOrderProducts } from "@/services/transformers/woocommerce/transformDeleteOrderProducts";
import axios, { AxiosResponse } from "axios";

export const useUpdateOrderWoo = () =>
{
    const dispatch = useAppDispatch();
    const [fetchUpdateOrder, { data: updatedOrder }] = useFetchUpdateOrderMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            const response: AxiosResponse = await axios({
                url: `/api/woo/delete-order-items/${orderId}`,
                method: 'DELETE',
            });
            console.log(response);
            const updateOrderData = await fetchUpdateOrder({
                credentials: {
                    line_items: [
                        ...transformDeleteOrderProducts(productLineIds),
                        ...transformCreateOrderProducts(items)
                    ]
                },
                id: orderId
            }).unwrap();
            dispatch(setLineItemsIds(transformLineItemsId(updateOrderData.line_items)));
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