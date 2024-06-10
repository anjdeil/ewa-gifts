// import { useState } from "react";
// import { useAppDispatch } from "./redux";
// import { transformCreateOrderProducts } from "@/services/transformers/woocommerce/transformCreateOrderProducts";
// import { setCurrentOrder } from "@/store/reducers/CurrentOrder";

// const dispatch = useAppDispatch();
// const [fetchCreateOrder, { data: newOrder }] = useFetchCreateOrderMutation();
// const [isLoading, setIsLoading] = useState(false);
// const [error, setError] = useState(null);

// const createOrder = async (items) =>
// {
//     setIsLoading(true);
//     try
//     {
//         const createOrderData = await fetchCreateOrder({ line_items: transformCreateOrderProducts(items) });
//         dispatch(setCurrentOrder(createOrderData.data.id));

//     } catch (error: any)
//     {
//         setError(error);
//         console.error(error, 'Failed to create order')
//     } finally
//     {
//         setIsLoading(false);
//     }

//     return { createOrder, isLoading, error };
// }