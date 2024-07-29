import { useState, useCallback } from "react";
import { setCurrentOrder } from "@/store/reducers/CurrentOrder";
import { useAppDispatch } from "@/hooks/redux";
import { useFetchCreateOrderMutation } from "@/store/wooCommerce/wooCommerceApi";
import { CartItem } from "@/types/Cart";
import { useCookies } from "react-cookie";
import { registrationUserDataType } from "@/types/Pages/checkout";

type OrderStatus = "processing" | "pending payment";

export const useCreateOrderWoo = () =>
{
    const dispatch = useAppDispatch();
    const [fetchCreateOrder, { data: createdOrder }] = useFetchCreateOrderMutation();
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setCookie] = useCookies(['orderId']);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    const createOrder = useCallback(async (items: CartItem[], status: OrderStatus, userFields?: registrationUserDataType | null) =>
    {
        setError(null);
        const fetchCreateOrderBody = {
            line_items: items,
            payment_method: "bacs",
            status: status,
            customer_id: userFields && userFields.id ? userFields.id : 0,
            billing: {
                ...userFields?.billing,
            },
            shipping: {
                ...userFields?.shipping,
            }
        };

        try
        {
            const createOrderData = await fetchCreateOrder(fetchCreateOrderBody).unwrap();
            if ('id' in createOrderData)
            {
                setCookie('orderId', createOrderData.id,
                    {
                        path: '/',
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)
                    });
                dispatch(setCurrentOrder(createOrderData.id));
            }
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, fetchCreateOrder]);

    return { createOrder, error, createdOrder };
};
