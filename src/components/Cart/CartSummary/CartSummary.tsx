import { Box } from "@mui/material";
import { FC, useMemo } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { CartSummaryProps } from "@/types/Shop";
import OrderTotals from "@/components/MyAccount/OrderTotals";

export const CartSummary: FC<CartSummaryProps> = ({ order, isLoading }) =>
{
    const link = useMemo(() =>
    {
        return order
            ? `https://new.ewagifts.pl/super-import-2/order-sheet.php?order_id=${order.id}`
            : '/';
    }, [order]);

    return (
        <Box className={`${styles.CartSummary} summary-wrapper`}>
            <div className={`${styles.CartSummary__title} secondary-title`}>Podsumowanie koszyka</div>
            <OrderTotals order={order} includeBorders={false} isLoading={isLoading} />
            <Box className={`${styles.CartSummary__btnWrapper}`}>
                <Link
                    className={`link btn btn-primary ${styles.CartSummary__btn}`}
                    href={order ? "/checkout" : "/cart"}>
                    Przejdz Do Platnosci
                </Link>
                <Link
                    href={link}
                    target="_blank"
                    className={`link btn btn-transparent ${styles.CartSummary__btn}`}>
                    Pobierz ofertę
                </Link>
            </Box>
        </Box>
    )
}