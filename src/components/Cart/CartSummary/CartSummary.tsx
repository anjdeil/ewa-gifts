import { Box } from "@mui/material";
import { FC } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { CartSummaryProps } from "@/types";
import OrderTotals from "@/components/MyAccount/OrderTotals";

export const CartSummary: FC<CartSummaryProps> = ({ order, isLoading }) =>
{
    return (
        <Box className={styles.CartSummary}>
            <h2 className={`${styles.CartSummary__title}`}>Podsumowanie koszyka</h2>
            <OrderTotals order={order} includeBorders={false} isLoading={isLoading} />
            <Box className={`${styles.CartSummary__btnWrapper}`}>
                <Link className={`link btn btn-primary ${styles.CartSummary__btn}`} href={"/checkout"}>
                    Przejdz Do Platnosci
                </Link>
                <Link
                    href={`https://new.ewagifts.pl/super-import-2/order-sheet.php?order_id=${order.id}`}
                    target="_blank"
                    className={`link btn btn-transparent ${styles.CartSummary__btn}`}>
                    Pobierz Oferte
                </Link>
            </Box>
        </Box>
    )
}