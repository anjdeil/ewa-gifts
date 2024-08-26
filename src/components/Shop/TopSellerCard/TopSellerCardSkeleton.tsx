import { FC } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const TopSellerCardSkeleton: FC = () =>
{
    return (
        <Box sx={{ width: '100%' }}>
            <Skeleton
                variant="rectangular"
                sx={{
                    borderRadius: '10px',
                    width: '100%',
                    height: '100%'
                }}
                height={300}
            >
            </Skeleton>
        </Box>
    )
}