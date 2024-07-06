import React from "react";
import styles from "./styles.module.scss";
import { Box, Skeleton } from "@mui/material";
import variables from '@/styles/variables.module.scss';

const MobileCategoryBarsSkeleton = () => {

    const categoryItems = [];
    for (let i = 0; i < 10; i++) {
        categoryItems.push(
            <li key={i} className={styles["mobile-category-bars__link"]}>
                <Skeleton
                    sx={{
                        backgroundColor: variables.whiteLilac,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        marginBottom: "10px",
                        "& > *": {
                            visibility: 'visible'
                        }
                    }}
                    width={85}
                    height={85}
                    variant="rectangular"
                >
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputLight,
                        }}
                        width={40}
                        height={40}
                        variant="circular"
                    />
                </Skeleton>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputLight,
                            textAlign: 'center',
                            fontSize: 20
                        }}
                        width="50%"
                        variant="text"
                    />
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputLight,
                            textAlign: 'center',
                            fontSize: 20
                        }}
                        width="60%"
                        variant="text"
                    />
                </Box>
            </li>
        );
    }

    return (
        <ul className={styles["mobile-category-bars__skeleton"]}>
            {categoryItems}
        </ul>

    )
}

export default MobileCategoryBarsSkeleton;