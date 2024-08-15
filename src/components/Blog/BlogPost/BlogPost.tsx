// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import styles from "./styles.module.scss";
import Image from "next/image";
import { Container, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BlogItemType } from "@/types";
import { FC } from "react";
import { transformDate } from "@/Utils/transformDateForBlog";
import { PageHeader } from "@/components/Layouts/PageHeader";

const CustomBox = styled(Box)`
  .wp-block-image {
    margin-bottom: 39px;
    @media (max-width: 1024px) {
      margin-bottom: 28px;
    }
    @media (max-width: 768px) {
      margin-bottom: 34px;
    }
  }
  .wp-block-image img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    display: block;
  }
  .wp-element-caption {
    margin-top: 16px;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #696969;
    @media (max-width: 768px) {
      margin-top: 8px;
    }
  }
  .wp-block-group {
    background-color: #f6f8fc;
    border-radius: 10px;
    padding: 32px;
    margin-bottom: 22px;
    @media (max-width: 768px) {
      padding: 16px;
    }
    & p {
      margin-bottom: 0;
    }
  }
`;

type Props = {
  post: BlogItemType;
};

export const BlogPost: FC<Props> = ({ post }) => {
  const { created, title, thumbnail, content } = post;

  const transformedDate = transformDate(created);

  const day = transformedDate?.day ?? null;
  const month = transformedDate?.month ?? null;
  const year = transformedDate?.year ?? null;

  const breadLinks = [
    { name: "Blog", url: "/blog" },
    { name: title, url: "" },
  ];

  return (
    <Container className={styles.article}>
      <header className={styles.article__header}>
        <PageHeader title={title} breadLinks={breadLinks} />

        {day && <time>{`${day} ${month}, ${year}`}</time>}
      </header>
      <div className={styles.article__img}>
        <Image
          src={thumbnail}
          alt={title}
          style={{ position: "static" }}
          width={1135}
          height={518}
          priority
          unoptimized={true}
        />
      </div>
      <div className={styles.article__text_wrapper}>
        <CustomBox
          dangerouslySetInnerHTML={{ __html: content }}
          className={styles.article__text}
        />
      </div>
    </Container>
  );
};
