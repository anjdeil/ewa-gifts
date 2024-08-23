import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC } from "react";
import { BlogPost } from "@/components/Blog/BlogPost";
import { BlogNavPosts } from "@/components/Blog/BlogNavPosts";
import { customRestApi } from "@/services/CustomRestApi";
import { z } from "zod";
import { Section } from "@/components/Layouts/Section";
import { BlogItemSchema, BlogItemType } from "@/types";
import { AxiosResponse } from "axios";

const ArticlePropsSchema = z.object({
  response: BlogItemSchema,
  prevPost: BlogItemSchema.nullable(),
  nextPost: BlogItemSchema.nullable(),
  error: z.string().optional(),
});

type ArticleProps = z.infer<typeof ArticlePropsSchema>;

const Article: FC<ArticleProps> = ({ response, prevPost, nextPost, error }) =>
{
  if (error)
  {
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

export const getServerSideProps: GetServerSideProps = async (context) =>
{
  const { slug } = context.params!;

  try
  {
    const { data } = await customRestApi.get("posts") as AxiosResponse;

    if (!data && !data.data) return { props: { error: "Server Error" } };

    const allPosts: BlogItemType[] = data.data.items;

    if (allPosts.length === 0)
      return { props: { error: "There are no articles" } };

    const currentIndex = allPosts.findIndex((post) => post.slug === slug);

    if (currentIndex === -1)
    {
      return { notFound: true };
    }

    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const nextPost =
      currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    return {
      props: {
        response: allPosts[currentIndex] || null,
        prevPost,
        nextPost,
      },
    };
  } catch (err)
  {
    console.error("Error fetching posts:", err);
    return {
      props: {
        response: null,
        prevPost: null,
        nextPost: null,
        error: "An unexpected error occurred",
      },
    };
  }
};

export default Article;
