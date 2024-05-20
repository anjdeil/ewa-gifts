import React from "react";
import styles from "./CategoryBars.module.scss";
import { Skeleton } from "@mui/material";
import variables from '@/styles/variables.module.scss';

const CategoryBarsSkeleton = () => {

    const categoryItems = [];
    for (let i = 0; i < 14; i++) {
        categoryItems.push(
            <li key={i} className={styles["categories-list__item"]}>
                <Skeleton
                    sx={{
                        backgroundColor: variables.whiteLilac,
                        position: 'absolute',
                        top: 0,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        "& > *": {
                            visibility: 'visible'
                        }
                    }}
                    width={"100%"}
                    height={"100%"}
                    variant="rectangular"
                >
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputLight,
                            marginBottom: '1em'
                        }}
                        width={60}
                        height={60}
                        variant="circular"
                    />
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputLight,
                        }}
                        width="50%"
                        variant="text"
                    />
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputLight,
                        }}
                        width="60%"
                        variant="text"
                    />
                </Skeleton>
            </li>
        );
    }

    return (
        <ul className={styles["categories-list"]}>
            {categoryItems}
        </ul>

    )
}

export default CategoryBarsSkeleton;