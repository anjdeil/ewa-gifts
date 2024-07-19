// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import styles from './styles.module.scss';
import Image from "next/image";
import { Container, Box } from "@mui/material";
import { styled } from '@mui/material/styles';

const CustomBox = styled(Box)`
  .wp-block-image{
      margin-bottom: 39px;
  }
  .wp-block-image img {
      width: 100%;
      height: auto;
      border-radius: 10px;
      display: block;
  }
  .wp-element-caption {
      margin-top: 12px;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      color: #696969;
  }
  .wp-block-group {
    background-color: #F6F8FC;
    border-radius: 10px;
    padding: 32px;
    margin-bottom: 22px;
    & p {
      margin-bottom: 0;
    }
  }
`;

export const BlogPost = ({ post }) => {

    const { date, title, image_src, content } = post;
    const dateTime: Date = new Date(date);
    const monthsPolish: string[] = [
        "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
        "lipca", "sierpnia", "września", "października", "listopada", "grudnia",
    ];
    const day: number = dateTime.getDate();
    const month: string = monthsPolish[dateTime.getMonth()];
    const year: number = dateTime.getFullYear();

    return (
        <Container className={styles.article}>
            <header className={styles.article__header}>
                <h1 className='sub-title'>
                    {title.rendered}
                </h1>
                <time>
                    {`${day} ${month}, ${year}`}
                </time>
            </header>
            <div className={styles.article__img}>
                <Image src={image_src} alt={title.rendered} sx={{ position: 'static' }} width={1135} height={518} priority />
            </div>
            <div className={styles.article__text_wrapper}>
                <CustomBox dangerouslySetInnerHTML={{ __html: content.rendered }} className={styles.article__text} />
            </div>
        </Container>
    );
};
