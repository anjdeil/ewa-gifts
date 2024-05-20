import { FC } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const ProductCardSkeleton: FC = () =>
{
    return (
        <Box sx={{ width: '100%' }}>
            <Skeleton variant="rectangular" sx={{ width: '100%', borderRadius: '10px' }} height={200} />
            <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
            </Box>
        </Box>
    )
}