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
                            <span>                                
                                    PREVIOUS                                
                            </span>
                            <span>{prevPost.title}</span>
                        </Link>
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
