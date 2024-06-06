// import { useRouter } from "next/router";
import Head from "next/head";
import { CartTable } from "@/components/Shop/CartTable";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/redux";
import { useEffect } from "react";
import { fetchCartRows } from "@/store/reducers/CartSlice";
import { CartSummary } from "@/components/Shop/CartSummary";
import { Box } from "@mui/material";

const Product = () =>
{
    // const router = useRouter();
    // const { slug } = router.query;

    const { items, totals, cartRows, isLoading } = useSelector(state => state.Cart);
    const dispatch = useAppDispatch();

    useEffect(() =>
    {
        dispatch(fetchCartRows(items));
    }, [dispatch, items]);

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
            </main>
        </>
    );
}

export default Product;