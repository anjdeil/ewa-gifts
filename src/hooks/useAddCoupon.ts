// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { useFetchUpdateOrderMutation } from "@/store/wooCommerce/wooCommerceApi";
import { useCallback, useState } from "react";

export const useAddCoupon = () => {
    const [fetchUpdateOrder] = useFetchUpdateOrderMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resetError = () => {
        setError(null);
    }

    const addCoupon = useCallback(async (orderId: number, coupon: string) => {
        setIsLoading(true);

        const fetchUpdateOrderBody = {
            credentials: {
                coupon_lines: [
                    { code: coupon }
                ]
            },
            id: orderId
        };
        try {
            const response = await fetchUpdateOrder(fetchUpdateOrderBody).unwrap();
            console.log(response);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(error.data.message);
            }
            console.error(error, 'Failed to add coupon');
        } finally {
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchUpdateOrder]);

    return { addCoupon, isLoading, error, resetError };
}