import { useCallback, useEffect, useState } from "react";
import { useFetchUpdateOrderMutation } from "@/store/wooCommerce/wooCommerceApi";
import axios from "axios";
import { RemoveObjectDuplicates } from "@/Utils/RemoveObjectDuplicates";
import { CartItem } from "@/types/Cart";
import { lineOrderItems } from "@/types";

export const useUpdateOrderWoo = () => {
    const [fetchUpdateOrder, { data }] = useFetchUpdateOrderMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [items, setItems] = useState<lineOrderItems[] | null>(null);
    const updatedOrder = data;

    useEffect(() => {
        if (data) {
            setItems(RemoveObjectDuplicates(data.line_items, 'name'))
        }
    }, [data])

    const localDeleteOrder = useCallback(async (orderId: number) => {
        setIsUpdating(true);
        try {
            await axios({
                url: `/api/woo/delete-order-items/${orderId}`,
                method: 'DELETE',
            });
        } catch (error) {
            console.error("Error deleting order items:", error);
            throw error;
        } finally {
            setIsUpdating(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatedOrder]);

    const localUpdateOrder = useCallback(async (items: CartItem[], orderId: number) => {
        await fetchUpdateOrder({
            credentials: {
                line_items: [
                    ...items
                ]
            },
            id: orderId
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatedOrder]);

    const updateOrder = async (items: CartItem[], orderId: number) => {
        setIsLoading(true);
        setError(null);

        try {
            if (!isUpdating) {
                await localDeleteOrder(orderId);
                await localUpdateOrder(items, orderId);
                setIsUpdating(false);
            }

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            console.error(err, 'Failed to update order');
        } finally {
            setIsLoading(false);
        }
    };

    return { updateOrder, isLoading, error, updatedOrder, items };
};