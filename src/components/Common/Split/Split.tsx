import { PageBuilder } from "@/components/PageBuilder";
import { SplitProps } from "@/types";
import { Box, styled, useMediaQuery } from "@mui/material";
import { FC } from "react";
import { SplitContainer } from '@/types/Common/Split';

const StyledBox = styled(Box)`

  padding: 0;

  & > div {
    width: 100%;
  }

  & .sub-title {
    margin-bottom: 30px;
    text-transform: uppercase;
  }

  @media (max-width: 1024px) {
    & .sub-title {
        margin-bottom: 20px;
        font-size: 16px;
      }

    & .desc {
        margin-bottom: 10px;
    }
  }
`;

export const Split: FC<SplitProps> = ({ leftContent, rightContent, isReversed = false }) =>
{
  const isMobile = useMediaQuery('(max-width: 768px)');
  const mobileColumn = isReversed ? "column-reverse" : "column";
  const SplitSection: FC<SplitContainer> = ({ isMobile, content }) =>
  {
    return (
      <StyledBox width={isMobile ? "100%" : "50%"} p={2} display={'flex'} alignItems={'center'}>
        <PageBuilder isContainer={false} sections={content} />
      </StyledBox>
    )
  };

  return (
    <Box display="flex"
      flexDirection={isMobile ? mobileColumn : "row"}
      gap={isMobile ? '15px' : '30px'}
    >
      {leftContent && <SplitSection isMobile={isMobile} content={leftContent} />}
      {rightContent && <SplitSection isMobile={isMobile} content={rightContent} />}
    </Box >
  )
}