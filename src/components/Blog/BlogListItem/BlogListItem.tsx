import { BlogItemProps } from "@/types";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { RichTextComponent } from "../../Common/RichTextComponent";
import styles from "./styles.module.scss";
import { transformDate } from "@/Utils/transformDateForBlog";

export const BlogListItem: FC<BlogItemProps> = ({ post }) =>
{
  const transformedDate = transformDate(post.created);

  const day = transformedDate?.day ?? null;
  const month = transformedDate?.month ?? null;
  const year = transformedDate?.year ?? null;

  return (
    <div className={styles.blogItem}>
      <Link href={`/blog/${post.slug}`} className={styles.blogItem__image}>
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          style={{ objectFit: "cover" }}
          unoptimized={true}
        />
      </Link>
      <h2 className={`sub-title ${styles.blogItem__title}`}>{post.title}</h2>
      <span className={`desc date ${styles.blogItem__date}`}>
        {day && <time>{`${day} ${month}, ${year}`}</time>}
      </span>
      <RichTextComponent
        text={post.excerpt}
        className={styles.blogItem__text}
      />
      <Link href={`/blog/${post.slug}`} className="desc more-link">
        Więcej
      </Link>
    </div>
  );
};