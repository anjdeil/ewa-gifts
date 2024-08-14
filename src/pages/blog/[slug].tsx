// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC } from "react";
import { BlogPost } from "@/components/Blog/BlogPost";
import { BlogNavPosts } from "@/components/Blog/BlogNavPosts";
import { customRestApi } from "@/services/CustomRestApi";
import { z } from "zod";
import { Section } from "@/components/Layouts/Section";
import { BlogItemSchema, BlogItemType } from "@/types";
// import ErrorPage from "../500";

const ArticlePropsSchema = z.object({
  response: BlogItemSchema,
  prevPost: BlogItemSchema.nullable(),
  nextPost: BlogItemSchema.nullable(),
  error: z.string().optional(),
});

type ArticleProps = z.infer<typeof ArticlePropsSchema>;

const Article: FC<ArticleProps> = ({ response, prevPost, nextPost, error }) => {
  if (error) {
    // return <ErrorPage />;
    throw new Error(error);
  }

  return (
    <>
      <Head>
        <title>{response.title}</title>
        <meta name="description" content={response.excerpt} />
      </Head>
      <main>
        <Section className={"container"}>
          <BlogPost post={response} />
          <BlogNavPosts prevPost={prevPost} nextPost={nextPost} />
        </Section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  let response: BlogItemType | null = null;
  let prevPost: BlogItemType | null = null;
  let nextPost: BlogItemType | null = null;
  let error: string | null = null;

  try {
    const allPostsResponse = await customRestApi.get(`posts`);

    if (allPostsResponse) {
      if (allPostsResponse.data) {
        const allPosts = (
          allPostsResponse.data as { data: { items: BlogItemType[] } }
        ).data.items;
        const currentIndex = allPosts.findIndex(
          (post: BlogItemType) => post.slug === slug
        );

        if (currentIndex === -1) {
          return { notFound: true };
        }

        if (currentIndex > 0) {
          prevPost = allPosts[currentIndex - 1];
        }
        if (currentIndex < allPosts.length - 1) {
          nextPost = allPosts[currentIndex + 1];
        }

        response = allPosts[currentIndex];
      } else {
        throw new Error("There are no articles");
      }
    } else {
      throw new Error("Server Error.");
    }
  } catch (err) {
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = "Server Error.";
    }
  }

  return {
    props: {
      response: response ?? null,
      prevPost: prevPost ?? null,
      nextPost: nextPost ?? null,
      error,
    },
  };
};

export default Article;
