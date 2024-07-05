import { useState } from "react";
import { transformCreateOrderProducts } from "@/services/transformers/woocommerce/transformCreateOrderProducts";
import { useFetchUpdateOrderMutation } from "@/store/wooCommerce/wooCommerceApi";
import { CartItem } from "@/types";
import axios from "axios";

export const useUpdateOrderWoo = () =>
{
    const [fetchUpdateOrder, { data: updatedOrder }] = useFetchUpdateOrderMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const updateOrder = async (
        items: CartItem[],
        orderId: number
    ) =>
    {
        setIsLoading(true);
        setError(null);

        try
        {
            if (!isUpdating)
            {
                setIsUpdating(true);

                await axios({
                    url: `/api/woo/delete-order-items/${orderId}`,
                    method: 'DELETE',
                });

                const resp = await fetchUpdateOrder({
                    credentials: {
                        line_items: [
                            ...transformCreateOrderProducts(items)
                        ]
                    },
                    id: orderId
                });

                setIsUpdating(false);
                console.log(resp.data.line_items);
            }

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