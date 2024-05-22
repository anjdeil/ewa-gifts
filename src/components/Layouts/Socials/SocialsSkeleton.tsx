import { Box, Skeleton } from "@mui/material"

export const SocialsSkeleton = () =>
{
    return (
        <Box sx={{ width: 300 }}>
            <Skeleton animation="wave" width={'100%'} height={30} />
            <Skeleton animation="wave" width={'100%'} height={20} />
            <Skeleton animation="wave" width={'100%'} height={20} />
            <Skeleton animation="wave" width={'100%'} height={20} />
            <Skeleton animation="wave" width={'100%'} height={20} />
            <Skeleton animation="wave" width={'100%'} height={20} />
            <Skeleton animation="wave" width={'100%'} height={20} />
        </Box>
    )
}