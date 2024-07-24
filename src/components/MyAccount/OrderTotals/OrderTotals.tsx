import React, { FC } from "react";
import styles from "./styles.module.scss";
import { OrderType } from "@/types/Services/woocommerce/OrderType";
import formatPrice from "@/Utils/formatPrice";
import getSubtotalByLineItems from "@/Utils/getSubtotalByLineItems";
import OrderTotalsRowsSkeleton from "./OrderTotalsRowsSkeleton";

interface OrderTotalsPropsType {
    order: OrderType | undefined,
    includeBorders?: boolean,
    isLoading?: boolean
}

const OrderTotals: FC<OrderTotalsPropsType> = ({ order, includeBorders = true, isLoading = false }) => {
    const subtotal = order ? getSubtotalByLineItems(order.line_items) : 0;

    return (
        <div className={`${styles['totals-table']} ${includeBorders && styles['totals-table_borders']}`}>
            {isLoading ?
                <OrderTotalsRowsSkeleton /> :
                <>
                    <div className={styles['totals-table__row']}>
                        <div className={styles['totals-table__label']}>Kwota</div>
                        <div className={styles['totals-table__value']}>{formatPrice(subtotal)}</div>
                    </div>
                    {order?.shipping_lines.map(line => (
                        <div key={line.id} className={styles['totals-table__row']}>
                            <div className={styles['totals-table__label']}>{line.method_title}</div>
                            <div className={styles['totals-table__value']}>{line.total} zł</div>
                        </div>
                    ))}
                    {order?.coupon_lines.map(line => {
                        const name = `Kod rabatowy ${line.discount_type === 'percent' ? `-${line.nominal_amount}% ` : ""}`;
                        return (
                            <div key={line.id} className={styles['totals-table__row']}>
                                <div className={styles['totals-table__label']}>
                                    {name} <br />
                                    <span className={styles['totals-table__label-code']}>{line.code}</span>
                                </div>
                                <div className={styles['totals-table__value']}>- {line.discount} zł</div>
                            </div>
                        );
                    })}
                    {order?.fee_lines.map(line => (
                        <div key={line.id} className={styles['totals-table__row']}>
                            <div className={styles['totals-table__label']}>{line.name}</div>
                            <div className={styles['totals-table__value']}>{line.total} zł</div>
                        </div>
                    ))}
                    {order?.tax_lines.map(line => (
                        <div key={line.id} className={styles['totals-table__row']}>
                            <div className={styles['totals-table__label']}>{line.label} ({line.rate_percent}%)</div>
                            <div className={styles['totals-table__value']}>{line.tax_total} zł</div>
                        </div>
                    ))}
                    <div className={styles['totals-table__row']}>
                        <div className={styles['totals-table__label']}>Metoda płatności</div>
                        <div className={styles['totals-table__value']}>{order?.payment_method_title || '—'}</div>
                    </div>
                    <div className={styles['totals-table__row']}>
                        <div className={styles['totals-table__label']}>Razem</div>
                        <div className={styles['totals-table__value']}>{order?.total || '—'} zł</div>
                    </div>
                </>
            }
        </div>
    );
}

export default OrderTotals;