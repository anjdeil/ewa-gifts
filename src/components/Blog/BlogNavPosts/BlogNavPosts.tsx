import Link from "next/link";
import styles from "./styles.module.scss";
import { Box, Container } from "@mui/material";
import { FC } from "react";
import { BlogItemType } from "@/types";

type Props = {
  prevPost: BlogItemType | null;
  nextPost: BlogItemType | null;
};

export const BlogNavPosts: FC<Props> = ({ prevPost, nextPost }) =>
{
  return (
    <Container className={styles.wrapper}>
      <nav className={styles.nav}>
        <Box className={styles.nav__block}>
          {prevPost && (
            <Link href={`/blog/${prevPost.slug}`}>
              <span className={styles.nav__text}>PREVIOUS</span>
              <span>{prevPost.title}</span>
            </Link>
          )}
        </Box>
        <Box className={styles.nav__block}>
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`}>
              <span className={styles.nav__text}>NEXT</span>
              <span>{nextPost.title}</span>
            </Link>
          )}
        </Box>
      </nav>
    </Container>
  );
};
