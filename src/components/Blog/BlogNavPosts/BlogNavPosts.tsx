// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import Link from "next/link";
import styles from "./styles.module.scss";
import { Container } from "@mui/material";
import { FC } from "react";
import { BlogItemType } from "@/types/Blog";

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
                        <>
                            <span>
                                <Link href={`/blog/${prevPost.slug}`}>
                                    PREVIOUS
                                </Link>
                            </span>
                            <span>{prevPost.title}</span>
                        </>
                    )}
                </div>
                <div className={styles.nav__block}>
                    {nextPost && (
                        <>
                            <span>
                                <Link href={`/blog/${nextPost.slug}`}>
                                    NEXT
                                </Link>
                            </span>
                            <span>{nextPost.title}</span>
                        </>
                    )}
                </div>
            </nav>
        </Container>
    );
};
