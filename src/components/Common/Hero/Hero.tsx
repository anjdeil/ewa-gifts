import { HeroProps } from "@/types";
import { FC } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { Text } from '@/components/Common/Text';

export const Hero: FC<HeroProps> = ({ section }) =>
{
    const isMobile = useMediaQuery('(max-width: 1024px)');
    return (
        <>
            <Box display="flex"
                flexDirection={isMobile ? "column" : (section.is_reverse ? "row-reverse" : "row")}
                gap={isMobile ? 0 : '5%'}
            >
                <Box width={isMobile ? "100%" : "60%"} p={2}>
                    <h3 className="sub-title">{section.title}</h3>
                    <Text text={section.text} />
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
                            src={section.image}
                            style={{
                                objectFit: "cover"
                            }}
                            alt={section.title}
                            fill
                            sizes="100%"
                        />
                    </div>
                </Box>
            </Box >
        </>
    )
}
