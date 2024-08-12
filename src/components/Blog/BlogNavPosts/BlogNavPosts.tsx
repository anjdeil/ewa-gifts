// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import Link from "next/link";
import styles from "./styles.module.scss";
import { Container } from "@mui/material";

export const BlogNavPosts = ({ prevPost, nextPost }) => {
  return (
    <Container className={styles.wrapper}>
      <nav className={styles.nav}>
        <div className={styles.nav__block}>
          {prevPost && (
            <>
              <span>
                <Link href={`/blog/${prevPost.slug}`}>PREVIOUS</Link>
              </span>
              <span>{prevPost.title}</span>
            </>
          )}
        </div>
        <div className={styles.nav__block}>
          {nextPost && (
            <>
              <span>
                <Link href={`/blog/${nextPost.slug}`}>NEXT</Link>
              </span>
              <span>{nextPost.title}</span>
            </>
          )}
        </div>
      </nav>
    </Container>
  );
};
