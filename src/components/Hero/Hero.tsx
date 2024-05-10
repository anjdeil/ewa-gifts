import { HeroPropsType } from "@/types";
import { FC } from "react";
import { RichTextComponent } from "../RichTextComponent";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";


interface HeroProps
{
    data: HeroPropsType;
}

export const Hero: FC<HeroProps> = ({ data }) =>
{
    console.log(data.images.large.src);
    const isMobile = useMediaQuery('(max-width: 1024px)');

    return (
        <>
            <Box display="flex"
                flexDirection={isMobile ? "column" : (data.isReversed ? "row-reverse" : "row")}
                gap={isMobile ? 0 : '5%'}
            >
                <Box width={isMobile ? "100%" : "60%"} p={2}>
                    <RichTextComponent richText={data.richText} />
                </Box>
                <Box width={isMobile ? "100%" : "40%"}
                    position={'relative'}
                    sx={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                        paddingTop: isMobile ? "60%" : undefined
                    }}>
                    <Image
                        src={data.images.large.src}
                        alt="Test"
                        layout="fill"
                        objectFit="cover"
                    />
                </Box>
            </Box >
        </>
    )
}
