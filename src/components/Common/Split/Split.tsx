import { PageBuilder } from "@/components/PageBuilder";
import { SplitProps } from "@/types";
import { Box, styled, useMediaQuery } from "@mui/material";
import { FC } from "react";
import { SplitContainer } from '@/types/Common/Split';

const StyledBox = styled(Box)`
  &>div{
    width: 100%;
  }
`;

export const Split: FC<SplitProps> = ({ leftContent, rightContent, isReversed = false }) =>
{
    const isMobile = useMediaQuery('(max-width: 1024px)');
    const mobileColumn = isReversed ? "column-reverse" : "column";

    const SplitSection: FC<SplitContainer> = ({ isMobile, content }) =>
    {
        // console.log(content);
        return (
            <StyledBox width={isMobile ? "100%" : "50%"} p={2} display={'flex'} alignItems={'center'}
            >
                <PageBuilder sections={content} />
            </StyledBox>
        )
    };

    return (
        <Box display="flex"
            flexDirection={isMobile ? mobileColumn : "row"}
        >
            {leftContent && <SplitSection isMobile={isMobile} content={leftContent} />}
            {rightContent && <SplitSection isMobile={isMobile} content={rightContent} />}
        </Box >
    )
}