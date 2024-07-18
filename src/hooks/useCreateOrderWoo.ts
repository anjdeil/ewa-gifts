import { useState, useCallback } from "react";
import { setCurrentOrder } from "@/store/reducers/CurrentOrder";
import { useAppDispatch } from "@/hooks/redux";
import { useFetchCreateOrderMutation } from "@/store/wooCommerce/wooCommerceApi";
import { RemoveObjectDuplicates } from "@/Utils/RemoveObjectDuplicates";
import { CartItem } from "@/types/Cart";

export const useCreateOrderWoo = () => {
    const dispatch = useAppDispatch();
    const [fetchCreateOrder, { data: createdOrder }] = useFetchCreateOrderMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [items, setItems] = useState<Record<string, any>[] | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const createOrder = useCallback(async (items: CartItem[]) => {
        setIsLoading(true);
        setError(null);
        const fetchCreateOrderBody = { line_items: items };

        try {
            const createOrderData = await fetchCreateOrder(fetchCreateOrderBody).unwrap();
            dispatch(setCurrentOrder(createOrderData.id));
            setItems(RemoveObjectDuplicates(createOrderData.line_items, 'name'));
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
            console.error(error, 'Failed to create order');
        } finally {
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, fetchCreateOrder]);

    return { createOrder, isLoading, error, createdOrder, items };
};
