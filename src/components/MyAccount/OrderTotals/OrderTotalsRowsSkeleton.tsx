import React from "react";
import styles from "./styles.module.scss";
import variables from "@/styles/variables.module.scss";
import { Skeleton } from "@mui/material";

const OrderTotalsRowsSkeleton = () => {
    return (
        <>
            <div className={styles['totals-table__row']}>
                <div className={styles['totals-table__label']}>
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputDarker,
                            borderRadius: '5px',
                            marginBottom: '10px'
                        }}
                        width={"100%"}
                        height={"1em"}
                        variant="rectangular"
                    >
                    </Skeleton>
                </div>
                <div className={styles['totals-table__value']}>
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputDarker,
                            borderRadius: '5px',
                            marginBottom: '10px'
                        }}
                        width={"70px"}
                        height={"1em"}
                        variant="rectangular"
                    >
                    </Skeleton>
                </div>
            </div>
            <div className={styles['totals-table__row']}>
                <div className={styles['totals-table__label']}>
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputDarker,
                            borderRadius: '5px',
                            marginBottom: '10px'
                        }}
                        width={"50%"}
                        height={"1em"}
                        variant="rectangular"
                    >
                    </Skeleton>
                </div>
                <div className={styles['totals-table__value']}>
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputDarker,
                            borderRadius: '5px',
                            marginBottom: '10px'
                        }}
                        width={"70px"}
                        height={"1em"}
                        variant="rectangular"
                    >
                    </Skeleton>
                </div>
            </div>
            <div className={styles['totals-table__row']}>
                <div className={styles['totals-table__label']}>
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputDarker,
                            borderRadius: '5px',
                            marginBottom: '10px'
                        }}
                        width={"90%"}
                        height={"1em"}
                        variant="rectangular"
                    >
                    </Skeleton>
                </div>
                <div className={styles['totals-table__value']}>
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputDarker,
                            borderRadius: '5px',
                            marginBottom: '10px'
                        }}
                        width={"70px"}
                        height={"1em"}
                        variant="rectangular"
                    >
                    </Skeleton>
                </div>
            </div>
            <div className={styles['totals-table__row']}>
                <div className={styles['totals-table__label']}>
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
                </div>
                <div className={styles['totals-table__value']}>
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputDarker,
                            borderRadius: '5px',
                            marginBottom: '10px'
                        }}
                        width={"70px"}
                        height={"1em"}
                        variant="rectangular"
                    >
                    </Skeleton>
                </div>
            </div>
            <div className={styles['totals-table__row']}>
                <div className={styles['totals-table__label']}>Razem</div>
                <div className={styles['totals-table__value']}>
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputDarker,
                            borderRadius: '5px',
                            marginBottom: '10px'
                        }}
                        width={"70px"}
                        height={"1em"}
                        variant="rectangular"
                    >
                    </Skeleton>
                </div>
            </div>
        </>
    );
}

export default OrderTotalsRowsSkeleton;