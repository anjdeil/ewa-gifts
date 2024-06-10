// import { useRouter } from "next/router";
import Head from "next/head";
import { CartTable } from "@/components/Shop/CartTable";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { fetchCartRows } from "@/store/reducers/CartSlice";
import { CartSummary } from "@/components/Shop/CartSummary";
import { Box } from "@mui/material";
import { useFetchCreateOrderMutation, useFetchUpdateOrderMutation } from "@/store/wooCommerce/wooCommerceApi";
import { setCurrentOrder } from "@/store/reducers/CurrentOrder";
import { transformCreateOrderProducts } from "@/services/transformers/woocommerce/transformCreateOrderProducts";
import { error } from "console";

const Product = () =>
{
    // const router = useRouter();
    // const { slug } = router.query;
    const dispatch = useAppDispatch();
    const { items, totals, cartRows, isLoading } = useAppSelector(state => state.Cart);
    const { currentOrder: { orderId } } = useAppSelector(state => state.currentOrderSlice);
    const [fetchCreateOrder, { data: newOrder }] = useFetchCreateOrderMutation();
    const [fetchUpdateOrder, { data: updatedOrder, isError, error }] = useFetchUpdateOrderMutation();

    useEffect(() =>
    {
        if (items.length > 0)
        {
            if (orderId)
            {
                dispatch(fetchCartRows(items));
                console.log(items);
                // console.log(orderId);
                fetchUpdateOrder(
                    {
                        credentials: {
                            line_items: [
                                {
                                    id: "713",
                                    product_id: "32706",
                                    quantity: "400",
                                    variation_id: "32709",
                                }
                            ]
                        },
                        // credentials: { line_items: transformCreateOrderProducts(items) },
                        id: orderId
                    }
                )
                if (isError)
                {
                    console.log(error);
                }

                if (updatedOrder)
                {
                    console.log(updatedOrder);
                    transformCartItems(items, updatedOrder.line_items)
                }
            } else
            {
                dispatch(setCurrentOrder(null));

                try
                {
                    const createOrderData = fetchCreateOrder({ line_items: transformCreateOrderProducts(items) });
                } catch (error)
                {
                    error => console.error(error, 'Failed create order')
                }

                if (newOrder)
                {
                    dispatch(setCurrentOrder(newOrder.id));
                }
            }
        }
    }, [dispatch, items, newOrder, orderId, updatedOrder]);

    function transformCartItems(items, orderLines)
    {
        items.map(item =>
        {

            orderLines.forEach(line =>
            {
                // console.log(line)
            })

            // if (item.type === 'variable')
            // {
            //     item.options.map(option =>
            //     {
            //         console.log(option.id);
            //     })
            // }
        })

        // })
        // orderLines.forEach(line =>
        // {
        //     console.log(line);
        // })
    }

    return (
        <>
            <Head>
                <title>Shopping cart</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <section className="section">
                    <h1>Koszyk</h1>
                    <Box display={"flex"}>
                        <CartTable products={cartRows} isLoading={isLoading} />
                        <CartSummary total={totals.total} sum={totals.total} isLoading={isLoading} />
                    </Box>
                </section>
            </main >
        </>
    );
}

export default Product;