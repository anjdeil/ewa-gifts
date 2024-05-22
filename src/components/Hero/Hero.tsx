import { HeroPropsType } from "@/types";
import { FC } from "react";
import { RichTextComponent } from "../Common/RichTextComponent";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";


interface HeroProps
{
    data: HeroPropsType;
}

export const Hero: FC<HeroProps> = ({ data }) =>
{
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
                    <div>
                        <Image
                            src={data.images.large.src}
                            style={{
                                objectFit: "cover"
                            }}
                            alt="Test"
                            fill
                            sizes="100%"
                        />
                    </div>
                </Box>
            </Box >
        </>
    )
}
