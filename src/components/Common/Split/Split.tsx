import { SplitProps } from "@/types";
import { Box, useMediaQuery } from "@mui/material";
import { FC } from "react";

export const Split: FC<SplitProps> = ({ leftContent, rightContent, isReversed = false }) =>
{
    const isMobile = useMediaQuery('(max-width: 1024px)');
    const mobileColumn = isReversed ? "column-reverse" : "column";

    return (
        <Box display="flex"
            flexDirection={isMobile ? mobileColumn : "row"}
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