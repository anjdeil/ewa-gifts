import { OrderType } from "@/types/Services/woocommerce/OrderType";
import React, { FC } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

interface OrderListPropsType {
    orders: OrderType[]
}

const OrderList: FC<OrderListPropsType> = ({ orders }) => {
    return (
        <div className={styles["orders-table"]}>
            <div className={`${styles["orders-table__row"]} ${styles["orders-table__row_header"]}`}>
                <div className={styles["orders-table__cell"]}>Zamówienie</div>
                <div className={styles["orders-table__cell"]}>Data</div>
                <div className={styles["orders-table__cell"]}>Status</div>
                <div className={styles["orders-table__cell"]}>Łącznie</div>
                <div className={styles["orders-table__cell"]}>Działania</div>
            </div>
            {orders?.map((order) => {
                const dateCreated = order.date_created && new Date(order.date_created).toLocaleDateString("pl-PL", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                const status = order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1);

                return (
                    <div key={order.id} className={styles["orders-table__row"]}>
                        <div className={styles["orders-table__cell"]}>
                            <div className={styles["orders-table__cell-prefix"]}>Zamówienie</div>
                            #{order.id}
                        </div>
                        <div className={styles["orders-table__cell"]}>
                            <div className={styles["orders-table__cell-prefix"]}>Data</div>
                            {dateCreated || "—"}
                        </div>
                        <div className={styles["orders-table__cell"]}>
                            <div className={styles["orders-table__cell-prefix"]}>Status</div>
                            {status}
                        </div>
                        <div className={styles["orders-table__cell"]}>
                            <div className={styles["orders-table__cell-prefix"]}>Łącznie</div>
                            {order.total ? `${order.total} zł` : '0 zł'}
                        </div>
                        <div className={`${styles["orders-table__cell"]} ${styles["orders-table__cell_button"]}`}>
                            <Link className={`link btn-secondary ${styles["orders-table__cell-button"]}`} href={`/my-account/orders/${order.id}`}>Zobacz</Link>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default OrderList;