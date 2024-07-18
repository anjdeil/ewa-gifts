import { lineOrderItems } from "@/types";
import React, { FC } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import formatPrice from "@/Utils/formatPrice";

interface OrderItemsPropsType {
    orderItems: lineOrderItems[]
}
const OrderItems: FC<OrderItemsPropsType> = ({ orderItems }) => {
    return (
        <div className={styles["order-items"]}>
            <div className={`${styles["order-items__row"]} ${styles["order-items__row_header"]}`}>
                <div className={styles["order-items__cell"]}>Product</div>
                <div className={styles["order-items__cell"]}>Cena</div>
                <div className={styles["order-items__cell"]}>Ilość</div>
                <div className={styles["order-items__cell"]}>Kwota</div>
            </div>
            {orderItems?.map((item) => {
                const totalDifference = +item.total - +item.subtotal;

                return (
                    <div key={item.id} className={styles["order-items__row"]}>
                        <div className={`${styles["order-items__cell"]} ${styles["order-items__cell_product"]}`}>
                            <div className={styles["order-items__product"]}>
                                <div className={styles["order-items__product-image"]}>
                                    <Image className={styles["order-items__cell-image"]} src={item?.image?.src} width={60} height={60} alt={item.name} />
                                </div>
                                <div className={styles["order-items__product-name"]}>
                                    {item.name}
                                </div>
                            </div>
                        </div>
                        <div className={styles["order-items__cell"]}>
                            <div className={styles["order-items__cell-prefix"]}>Cena</div>
                            {item.subtotal} zł
                        </div>
                        <div className={styles["order-items__cell"]}>
                            <div className={styles["order-items__cell-prefix"]}>Ilość</div>
                            {item.quantity}
                        </div>
                        <div className={styles["order-items__cell"]}>
                            <div className={styles["order-items__cell-prefix"]}>Kwota</div>
                            <span>
                                {item.total} zł <br />
                                {(totalDifference !== 0) && <span className={styles["order-items__cell-postfix"]}>{formatPrice(totalDifference)}</span>}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default OrderItems;