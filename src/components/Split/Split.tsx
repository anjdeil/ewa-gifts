import { Box, useMediaQuery } from "@mui/material";
import { FC, ReactNode } from "react";
// import Image from "next/image";

interface SplitProps
{
    leftContent: ReactNode;
    rightContent: ReactNode;
    isReversed: boolean;
}

export const Split: FC<SplitProps> = ({ leftContent, rightContent, isReversed }) =>
{
    const isMobile = useMediaQuery('(max-width: 1024px)');

    return (
        <Box display="flex"
            flexDirection={isMobile ? "column" : (isReversed ? "row-reverse" : "row")}
        >
            <Box width={isMobile ? "100%" : "50%"} p={2}>
                {leftContent}
            </Box>
            <Box width={isMobile ? "100%" : "50%"}
                position={'relative'}
                sx={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                }}>
                {rightContent}
            </Box>
        </Box >
    )
}