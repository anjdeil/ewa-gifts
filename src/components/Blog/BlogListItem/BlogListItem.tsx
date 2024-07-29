import { BlogItemProps } from "@/types";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { RichTextComponent } from "../../Common/RichTextComponent";
import styles from './styles.module.scss';

export const BlogListItem: FC<BlogItemProps> = ({ post }) => {
    return (
        <div key={post.id}>
            <Link href={post.slug} className={styles.blogItem__image}>
                <Image src={post.image_src} alt={post.title} fill style={{ objectFit: 'cover' }} unoptimized={true} />
            </Link>
            <h2 className={`sub-title ${styles.blogItem__title}`}>
                {post.title}
            </h2>
            <span className={`desc date ${styles.blogItem__date}`}>
                {post.date}
            </span>
            <RichTextComponent text={post.excerpt} className={styles.blogItem__text} />
            <Link href={`/blog/${post.slug}`} className="more-link">
                More
            </Link>
        </div>
    )
}
