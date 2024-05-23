import { SocialsSkeletonProps } from "@/types";
import { Box, Skeleton } from "@mui/material"
import { FC } from "react";

export const SocialsSkeleton: FC<SocialsSkeletonProps> = ({ elements, isColumn = false, width, height, gap }) =>
{
    const skeletonItems = Array.from({ length: elements }).map((_, index) => (
        <Skeleton key={index} animation="wave" width={width} height={height} />
    ));

    return (
        <Box sx={{
            width: 300,
            display: 'flex',
            flexDirection: isColumn ? 'column' : 'row',
            gap: gap
        }}>
            {skeletonItems}
        </Box>
    )
}