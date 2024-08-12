// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC } from "react";
import { BlogPost } from "@/components/Blog/BlogPost";
import { BlogNavPosts } from "@/components/Blog/BlogNavPosts";
import { customRestApi } from "@/services/CustomRestApi";
import { z } from "zod";
import ErrorPage from "../500";

const PostSchema = z.object({
  id: z.number(),
  slug: z.string(),
  status: z.string(),
  type: z.string(),
  parent: z.number(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string(),
  menu_order: z.number(),
  categories: z.array(
    z.object({
      id: z.number(),
      parent_id: z.number(),
      name: z.string(),
      slug: z.string(),
      description: z.string(),
      count: z.number(),
    })
  ),
});

const ResponseSchema = z.object({
  status: z.string(),
  data: z.object({
    item: PostSchema,
  }),
});

interface ArticleProps {
  response: z.infer<typeof PostSchema>;
  prevPost: z.infer<typeof PostSchema> | null;
  nextPost: z.infer<typeof PostSchema> | null;
  error?: string;
}
const Article: FC<ArticleProps> = ({ response, prevPost, nextPost, error }) => {
  if (error) {
    throw new Error(error);
  }

  //   if (error) {
  //     return <ErrorPage statusCode={500} />;
  //   }

  return (
    <>
      <Head>
        <title>{response.title.rendered}</title>
        <meta name="description" content={response.excerpt} />
      </Head>
      <main>
        <div className="container">
          <BlogPost post={response} />
          <BlogNavPosts prevPost={prevPost} nextPost={nextPost} />
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  let response;
  let prevPost = null;
  let nextPost = null;

  try {
    const allPostsResponse = await customRestApi.get(`posts`);
    const allPosts = allPostsResponse.data.data.items;

    const currentIndex = allPosts.findIndex((post) => post.slug === slug);

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
  } catch (error) {
    return { props: { error: "Server Error." } };
  }

  const props = {
    response,
    prevPost,
    nextPost,
  };

  return {
    props,
  };
};

export default Article;
