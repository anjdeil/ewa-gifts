import { BlogList } from "@/components/Blog/BlogList";
import { Loader } from "@/components/Layouts/Loader";
import { PageHeader } from "@/components/Layouts/PageHeader";
import PagesNavigation from "@/components/Layouts/PagesNavigation";
import { Section } from "@/components/Layouts/Section";
import { domain } from "@/constants";
import { customRestApi } from "@/services/CustomRestApi";
import { useFetchPostsQuery } from "@/store/custom/customApi";
import { BlogItemSchema, BlogItemType } from "@/types/Blog";
import { responseMultipleCustomApi } from "@/types/Services/customApi";
import { getCanonicalLink } from "@/Utils/getCanonicalLink";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

const BlogPropsSchema = z.object({
    response: z.array(BlogItemSchema),
    page: z.number(),
    count: z.number(),
    error: z.string().optional(),
});

const perPage = 10;

type BlogProps = z.infer<typeof BlogPropsSchema>;

function Blog({ response, page, count, error }: BlogProps)
{
    const router = useRouter();
    const [posts, setPosts] = useState<BlogItemType[]>(response);
    const [currentPage, setCurrentPage] = useState<number>(page);
    const [initialLoad, setInitialLoad] = useState<boolean>(true);

    if (error)
    {
        throw new Error(error);
    }

    const { data: fetchedPosts, isLoading } = useFetchPostsQuery(
        { per_page: perPage, page: currentPage },
        {
            skip: initialLoad,
        }
    );

    useEffect(() =>
    {
        setInitialLoad(false);
    }, []);

    useEffect(() =>
    {
        if (fetchedPosts)
        {
            setPosts(fetchedPosts.data?.items || []);
        }
    }, [fetchedPosts]);

    const switchPage = (newPage: number) =>
    {
        const validPage = isNaN(newPage) || newPage <= 0 ? 1 : newPage;

        const params = { ...router.query };

        if (validPage === 1)
        {
            delete params.page;
        } else
        {
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
    const canonicalUrl = useMemo(() => getCanonicalLink(router.asPath, domain, true), [router.asPath]);
    if (isLoading && posts.length === 0)
        return <Loader thickness={5} size={24} />;

    return (
        <>
            <Head>
                <title>{pageTitle} - Ewa Gifts</title>
                <meta name="description" content={`This is ${pageTitle}`} />
                <link rel="canonical" href={canonicalUrl} />
            </Head>
            <main>
                <Section className="container">
                    <PageHeader title={pageTitle} breadLinks={breadLinks} />
                    <BlogList data={posts} />
                    {pagesCount > 1 && (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
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
}

export const getServerSideProps: GetServerSideProps = async (context) =>
{
    const params = context.query;
    const page: number = Number(params.page) > 0 ? Number(params.page) : 1;

    try
    {
        const allPostsResponse = await customRestApi.get(
            `posts?page=${page}&per_page=${perPage}`
        );

        if (!allPostsResponse || !allPostsResponse.data)
            return { props: { error: "Server Error" } };

        const allPostsData = allPostsResponse.data as responseMultipleCustomApi;

        const response = allPostsData.data.items;

        if (!response.length)
        {
            return { notFound: true };
        }

        const count = allPostsData.data.statistic.posts_count;

        return {
            props: {
                response,
                page,
                count,
                error: null,
            },
        };
    } catch (err)
    {
        console.error("Error fetching posts:", err);
        return {
            props: {
                error: "An unexpected error occurred",
            },
        };
    }
};

export default Blog;
