import { useState } from "react";
import { CartItem } from "@/types/Cart";
import axios from "axios";
import { OrderType } from "@/types/Services/woocommerce/OrderType";

export const useUpdateOrderWoo = () =>
{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [orderData, setOrderData] = useState<OrderType | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    const updateOrder = async (items: CartItem[], orderId: number) =>
    {
        setIsLoading(true);
        setError(null);
        try
        {
            const response = await axios.put(`/api/woo/orders/${orderId}`, {
                credentials: {
                    line_items: [
                        ...items
                    ]
                }
            });

            if ("data" in response) setOrderData(response.data);

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

    return { updateOrder, isLoading, error, orderData };
};