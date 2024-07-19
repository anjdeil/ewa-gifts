import { Box, Skeleton } from "@mui/material";
import { FC } from "react";
import { CartSummaryRowProps } from "@/types";

export const CartSummaryRow: FC<CartSummaryRowProps> = ({ title, value, className, isLoading, skeleton }) => (
    <Box className={`${className}`}>
        <h3>
            {title}
        </h3>
        {isLoading && skeleton ?
            <Skeleton width={skeleton.width} height={skeleton.height} animation="wave" />
            :
            <span>
                {value}
            </span>
        }

    </Box>
)