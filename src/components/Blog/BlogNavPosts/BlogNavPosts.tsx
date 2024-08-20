// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import Link from "next/link";
import styles from "./styles.module.scss";
import { Container } from "@mui/material";
import { FC } from "react";
import { BlogItemType } from "@/types";

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
              <span className={styles.nav__text}>PREVIOUS</span>
              <span>{prevPost.title}</span>
            </Link>
          )}
        </div>
        <div className={styles.nav__block}>
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`}>
              <span className={styles.nav__text}>NEXT</span>
              <span>{nextPost.title}</span>
            </Link>
          )}
        </div>
      </nav>
    </Container>
  );
};
