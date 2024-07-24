import React, { FC } from "react";
import styles from "./styles.module.scss"
import { Skeleton } from "@mui/material";
import variables from "@/styles/variables.module.scss";

interface MiniCartSkeletonPropsType {
    showSubtotals?: boolean,
}

const MiniCartSkeleton: FC<MiniCartSkeletonPropsType> = ({ showSubtotals = false }) => {

    const items = [];
    for (let i = 0; i < 3; i++) {
        items.push(
            <li key={i} className={`${styles["mini-cart__item"]} ${showSubtotals && styles["mini-cart__item_subtotal"]}`}>
                <Skeleton
                    sx={{
                        backgroundColor: variables.inputDarker,
                        borderRadius: '10px'
                    }}
                    width={65}
                    height={65}
                    variant="rectangular"
                >
                </Skeleton>
                <div>
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputDarker,
                            borderRadius: '5px',
                            marginBottom: '10px'
                        }}
                        width={"70%"}
                        height={"1em"}
                        variant="rectangular"
                    >
                    </Skeleton>
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputDarker,
                            borderRadius: '5px',
                        }}
                        width={"40%"}
                        height={"1em"}
                        variant="rectangular"
                    >
                    </Skeleton>
                </div>
                {showSubtotals &&
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputDarker,
                            borderRadius: '5px',
                        }}
                        width={"70px"}
                        height={"1em"}
                        variant="rectangular"
                    >
                    </Skeleton>
                }
            </li>
        );
    }

    return (
        <ul className={styles["mini-cart"]}>
            {items}
        </ul>
    );
}

export default MiniCartSkeleton;