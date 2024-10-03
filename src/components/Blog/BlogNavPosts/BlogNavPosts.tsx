// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { BlogItemType } from "@/types/Blog";
import { Container } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import styles from "./styles.module.scss";

type Props = {
    prevPost: BlogItemType | null;
    nextPost: BlogItemType | null;
};

export const BlogNavPosts: FC<Props> = ({ prevPost, nextPost }) => {
    return (
        <Container className={styles.wrapper}>
            <nav className={styles.nav}>
                <div className={styles.nav__block}>
                    {prevPost && (
                        <Link href={`/blog/${prevPost.slug}`}>
                            <span className={styles.nav__text}>Poprzedni</span>
                            <span>{prevPost.title}</span>
                        </Link>
                    )}
                </div>
                <div className={styles.nav__block}>
                    {nextPost && (
                        <Link href={`/blog/${nextPost.slug}`}>
                            <span className={styles.nav__text}>Następny</span>
                            <span>{nextPost.title}</span>
                        </Link>
                    )}
                </div>
            </nav>
        </Container>
    );
};
