import React, { FC } from "react";
import styles from "./styles.module.scss"
import { lineOrderItems } from "@/types";
import MiniCartItem from "./MiniCartItem";
import MiniCartSkeleton from "./MiniCartSkeleton";
import Notification from "@/components/Layouts/Notification";

interface MiniCartPropsType {
    lineItems: lineOrderItems[] | undefined,
    showSubtotals?: boolean,
    isLoading?: boolean,
    isEmpty?: boolean
}

const MiniCart: FC<MiniCartPropsType> = ({ lineItems, showSubtotals = false, isLoading = false, isEmpty = false }) => {

    if (isLoading) {
        return <MiniCartSkeleton showSubtotals={showSubtotals} />
    }

    return (
        <ul className={styles["mini-cart"]}>
            {(lineItems?.length && !isEmpty) ?
                lineItems.map((cartItem) => (
                    <MiniCartItem showSubtotal={showSubtotals} key={cartItem.product_id} cartItem={cartItem} />
                )) :
                <Notification>
                    <p className="text-center text-gray">Koszyk jest pusty</p>
                </Notification>
            }
        </ul>
    );
}

export default MiniCart;