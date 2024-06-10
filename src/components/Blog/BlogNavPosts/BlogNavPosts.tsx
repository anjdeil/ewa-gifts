import Link from "next/link";
import styles from "./styles.module.scss";
import {Container} from "@mui/material";

export const BlogNavPosts = ({prevPost, nextPost}) => {
   return (
       <Container  className={styles.wrapper}>
       <nav className={styles.nav}>
           {prevPost && (
               <div className={styles.nav__block}>
                   <span>
                       <Link href={`/blog/${prevPost.slug}`}>
                           PREVIOUS
                       </Link>
                   </span>
                   <span>
                       {prevPost.title.rendered}
                   </span>
               </div>
           )}
           {nextPost && (
               <div className={styles.nav__block}>
                   <span>
                       <Link href={`/blog/${nextPost.slug}`}>
                           NEXT
                       </Link>
                   </span>
                   <span>
                        {nextPost.title.rendered}
                    </span>
               </div>
           )}
       </nav>
       </Container>
   )
}