import { Box } from "@mui/material";
import { FC } from "react";
import styles from "./styles.module.scss";
import { CartSummaryRow } from "./CartSummaryRow";
import Link from "next/link";
import { CartSummaryProps } from "@/types";

export const CartSummary: FC<CartSummaryProps> = ({ total, sum, isLoading }) =>
{
    return (
        <Box className={styles.CartSummary}>
            <h2 className={`${styles.CartSummary__title}`}>Podsumowanie koszyka</h2>
            <ul className={`list-reset ${styles.CartSummary__list}`}>
                <li>
                    <CartSummaryRow title={'Kwota'}
                        value={total + ' zł'}
                        className={styles.CartSummary__row}
                        isLoading={isLoading}
                        skeleton={{
                            width: "100px",
                            height: '30px'
                        }}
                    />
                </li>
                <li>
                    <CartSummaryRow title={'Wysyłka'}
                        value={'Płaska stawka Oblicz koszty wysyłki'}
                        className={styles.CartSummary__row}
                        isLoading={isLoading}
                        skeleton={{
                            width: "100px",
                            height: '30px'
                        }}
                    />
                </li>
                <li>
                    <CartSummaryRow title={'Wysyłka EasyGifts (brutto)'}
                        value={'zł36.92'}
                        className={styles.CartSummary__row}
                        isLoading={isLoading}
                        skeleton={{
                            width: "100px",
                            height: '30px'
                        }}
                    />
                </li>
                <li>
                    <CartSummaryRow title={'VAT'}
                        value={'36.92 zł'}
                        className={styles.CartSummary__row}
                        isLoading={isLoading}
                        skeleton={{
                            width: "100px",
                            height: '30px'
                        }}
                    />
                </li>
                <li>
                    <CartSummaryRow title={'Łącznie'}
                        value={sum + ' zł'}
                        className={styles.CartSummary__row}
                        isLoading={isLoading}
                        skeleton={{
                            width: "100px",
                            height: '30px'
                        }}
                    />
                </li>
            </ul>
            <Box className={`${styles.CartSummary__btnWrapper}`}>
                <Link className={`link btn btn-primary ${styles.CartSummary__btn}`} href={""}>
                    Przejdz Do Platnosci
                </Link>
                <button className={`link btn btn-transparent ${styles.CartSummary__btn}`}>
                    Pobierz Oferte
                </button>
            </Box>
        </Box>
    )
}