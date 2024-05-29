import { HeroProps } from "@/types";
import { FC } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { Text } from '@/components/Common/Text';
import Link from "next/link";
import styles from './styles.module.scss';

export const Hero: FC<HeroProps> = ({ section }) =>
{
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');
    const imagePaddingTop = isMobile && '40%' || isTablet && '80%' || '50%';
    const isReverse = section.is_reverse;
    return (
        <>
            <Box display="flex"
                flexDirection={isMobile ? "column-reverse" : (isReverse ? "row-reverse" : "row")}
                gap={isMobile ? 0 : '20px'}
            >
                <Box width={isMobile ? "100%" : "60%"} sx={{
                    paddingTop: isMobile ? '20px' : 'initial',
                }}>
                    <h3 className={`sub-title ${styles.hero__title}`}>{section.title}</h3>
                    <Text className={styles.hero__text} text={section.text} />
                    {section.link_url && <Link className="more-link" href={section.link_url}>{section.link_text}</Link>}
                </Box>
                <Box width={isMobile ? "100%" : "40%"}
                    position={'relative'}
                    sx={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                    }}>
                    <Box position={'relative'}
                        paddingTop={imagePaddingTop}
                        overflow={"hidden"}
                        borderRadius={"15px"}
                    >
                        <Image
                            src={section.image}
                            style={{
                                objectFit: "cover"
                            }}
                            alt={section.title}
                            layout="fill"
                            objectFit="cover"
                            sizes="100%"
                        />
                    </Box>
                </Box>
            </Box >
        </>
    )
}
