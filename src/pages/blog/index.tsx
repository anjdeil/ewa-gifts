// import wpRestApi from "@/services/wordpress/WPRestAPI";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { BlogList } from "@/components/Blog/BlogList";
import { PageHeader } from "@/components/Layouts/PageHeader";
import { Section } from "@/components/Layouts/Section";
import { customRestApi } from "@/services/CustomRestApi";
import { BlogItemSchema, BlogItemType } from "@/types";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC } from "react";
import { z } from "zod";

const BlogPropsSchema = z.object({
  response: z.array(BlogItemSchema),
  error: z.string().optional(),
});

type BlogProps = z.infer<typeof BlogPropsSchema>;

const Blog: FC<BlogProps> = ({ response, error }) => {
  const pageTitle = "Blog";
  console.log(response);

  if (error) {
    throw new Error(error);
  }

  const breadLinks = [{ name: pageTitle, url: "" }];

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <main>
        <Section className={"container"}>
          <PageHeader title={pageTitle} breadLinks={breadLinks} />
          <BlogList data={response} />
        </Section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let response: BlogItemType[] | null = null;
  let error: string | null = null;

  try {
    const allPostsResponse = await customRestApi.get(`posts`);

    if (allPostsResponse) {
      if (allPostsResponse.data) {
        const allPosts = (
          allPostsResponse.data as { data: { items: BlogItemType[] } }
        ).data.items;

        if (!allPosts.length) {
          return { notFound: true };
        }

        response = allPosts;
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
      error,
    },
  };
};

export default Blog;
