import React, { FC } from "react";
import styles from "./styles.module.scss";
import { OrderType } from "@/types/Services/woocommerce/OrderType";
import formatPrice from "@/Utils/formatPrice";
import getSubtotalByLineItems from "@/Utils/getSubtotalByLineItems";

interface OrderTotalsPropsType {
    order: OrderType
}

const OrderTotals: FC<OrderTotalsPropsType> = ({ order }) => {
    const subtotal = getSubtotalByLineItems(order.line_items);

    return (
        <div className={styles['totals-table']}>
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
                <div className={styles['totals-table__value']}>{order.payment_method_title || '—'}</div>
            </div>
            <div className={styles['totals-table__row']}>
                <div className={styles['totals-table__label']}>Razem</div>
                <div className={styles['totals-table__value']}>{order.total} zł</div>
            </div>
        </div>
    );
}

export default OrderTotals;