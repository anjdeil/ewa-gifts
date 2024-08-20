import { HeroProps } from "@/types/Common";
import { FC } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { Text } from '@/components/Common/Text';
import Link from "next/link";
import styles from './styles.module.scss';

export const Hero: FC<HeroProps> = ({ section }) =>
{
    const isReverse = section.is_reverse ? styles.hero__wrapper_reverse : '';
    return (
        <>
            <Box className={`${styles.hero__wrapper} ${isReverse}`}>
                <Box className={styles.hero__left}>
                    <h3 className={`sub-title ${styles.hero__title}`}>{section.title}</h3>
                    <Text className={styles.hero__text} text={section.text} />
                    {section.link_url && <Link className="more-link" href={section.link_url}>{section.link_text}</Link>}
                </Box>
                <Box className={styles.hero__right}>
                    <Box className={styles.hero__image}>
                        <Image
                            src={section.image}
                            alt={section.title}
                            layout="fill"
                            sizes="100%"
                            objectFit={section.object_fit}
                        />
                    </Box>
                </Box>
            </Box >
        </>
    )
}
