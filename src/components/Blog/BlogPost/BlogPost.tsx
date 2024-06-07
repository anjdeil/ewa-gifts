import { FC } from 'react';
import { BlogItemProps } from '@/types/Blog';
import styles from './styles.module.scss';
import Image from "next/image";
import {Container} from "@mui/material";

interface BlogItemProps {
    post: BlogItemProps;
}

export const BlogPost: FC<BlogItemProps> = ({ post }) => {
    const {date, title,image_src,content } = post;
    const dateTime: Date = new Date(date);
    const monthsPolish: string[] = [
        "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
        "lipca", "sierpnia", "września", "października", "listopada", "grudnia",
    ];
    const day: number = dateTime.getDate();
    const month: string = monthsPolish[dateTime.getMonth()];
    const year: number = dateTime.getFullYear();

    return (
        <Container  className={styles.article}>
            <header className={styles.article__header}>
                <time>
                    {`${day} ${month}, ${year}`}
                </time>
                <h1 className={`sub-title ${styles.article__title}`}>
                    {title.rendered}
                </h1>
            </header>
            <div className={styles.article__img}>
                <Image src={image_src} alt={title.rendered} sx={{position:'static'}} fill priority/>
            </div>
           <div className={styles.article__text_wrapper}>
               <div dangerouslySetInnerHTML={{__html: content.rendered}}  className={styles.article__text}/>
           </div>
        </Container>
    );
};
