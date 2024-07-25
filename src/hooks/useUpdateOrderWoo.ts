import { useState } from "react";
import { useFetchUpdateOrderMutation } from "@/store/wooCommerce/wooCommerceApi";
import { CartItem } from "@/types/Cart";

export const useUpdateOrderWoo = () =>
{
    const [fetchUpdateOrder, { data }] = useFetchUpdateOrderMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedOrder = data;

    const updateOrder = async (items: CartItem[], orderId: number) =>
    {
        setIsLoading(true);
        setError(null);
        try
        {
            await fetchUpdateOrder({
                credentials: {
                    line_items: [
                        ...items
                    ]
                },
                id: orderId
            });

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