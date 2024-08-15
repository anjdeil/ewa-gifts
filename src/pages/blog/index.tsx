// import wpRestApi from "@/services/wordpress/WPRestAPI";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { BlogList } from "@/components/Blog/BlogList";
import { Loader } from "@/components/Layouts/Loader";
import { PageHeader } from "@/components/Layouts/PageHeader";
import PagesNavigation from "@/components/Layouts/PagesNavigation";
import { Section } from "@/components/Layouts/Section";
import { customRestApi } from "@/services/CustomRestApi";
import { useFetchPostsQuery } from "@/store/custom/customApi";
import { BlogItemSchema, BlogItemType } from "@/types";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { z } from "zod";

const BlogPropsSchema = z.object({
  response: z.array(BlogItemSchema),
  page: z.number(),
  count: z.number(),
  error: z.string().optional(),
});

const perPage = 10;

type BlogProps = z.infer<typeof BlogPropsSchema>;

const Blog: FC<BlogProps> = ({ response, page, count, error }) => {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogItemType[]>(response);
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [initialLoad, setInitialLoad] = useState(true);

  const { data: fetchedPosts, isLoading } = useFetchPostsQuery(
    { per_page: perPage, page: currentPage },
    {
      skip: initialLoad,
    }
  );

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts.data?.items || []);
    }
  }, [fetchedPosts]);

  if (error) {
    throw new Error(error);
  }

  const switchPage = (newPage: number) => {
    const validPage = isNaN(newPage) || newPage <= 0 ? 1 : newPage;

    const params = { ...router.query };

    if (validPage === 1) {
      delete params.page;
    } else {
      params.page = String(validPage);
    }

    router.push(
      {
        pathname: router.pathname,
        query: params,
      },
      undefined,
      { shallow: true }
    );

    setCurrentPage(newPage);
  };

  const pagesCount = Math.ceil(count / perPage);
  const pageTitle = "Blog";
  const breadLinks = [{ name: pageTitle, url: "" }];

  if (isLoading && posts.length === 0)
    return <Loader thickness={5} size={24} />;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <main>
        <Section className="container">
          <PageHeader title={pageTitle} breadLinks={breadLinks} />
          <BlogList data={posts} />
          {pagesCount > 1 && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <PagesNavigation
                page={currentPage}
                count={pagesCount}
                siblingCount={1}
                shape="rounded"
                hidePrevButton
                hideNextButton
                onChange={(_, page) => switchPage(page)}
              />
            </Box>
          )}
        </Section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let response: BlogItemType[] | null = null;
  let count: number | null = null;
  let error: string | null = null;
  const params = context.query;
  let page: number =
    typeof params.page === "string" &&
    !isNaN(Number(params.page)) &&
    Number(params.page) > 0
      ? Number(params.page)
      : 1;

  try {
    const allPostsResponse = await customRestApi.get(
      `posts?page=${page}&per_page=${perPage}`
    );

    if (allPostsResponse) {
      if (allPostsResponse.data) {
        const allPostsData = allPostsResponse.data as {
          data: {
            items: BlogItemType[];
            statistic: {
              posts_count: number;
            };
          };
        };

        const allPosts = allPostsData.data.items;
        count = allPostsData.data.statistic.posts_count;

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
      page,
      count,
      error,
    },
  };
};

export default Blog;
