// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC } from "react";
import wpRestApi from "@/services/wordpress/wpRestAPI";
import { BlogPost } from "@/components/Blog/BlogPost";
import { BlogNavPosts } from "@/components/Blog/BlogNavPosts";

interface ArticleProps
{
}

const Article: FC<ArticleProps> = ({ response, prevPost, nextPost }) =>
{
    if (!response)
    {
        return <p>Loading...</p>;
    }
    const breadCurrent = {
        name: response.title.rendered,
        url: response.link,
    };
    console.log(breadCurrent);
    return (
        <>
            <Head>
                <title>{response.title.rendered}</title>
                <meta name="description" content={response.title.rendered} />
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

export const getServerSideProps: GetServerSideProps = async (context) =>
{
    const { slug } = context.params!;
    let response;
    let prevPost = null;
    let nextPost = null;

    try
    {
        const currentPostResponse = await wpRestApi.get(`posts?slug=${slug}`);
        if (currentPostResponse.data.length === 0)
        {
            return { notFound: true };
        }

        const currentPost = currentPostResponse.data[0];

        const allPostsResponse = await wpRestApi.get(`posts`);
        const allPosts = allPostsResponse.data;

        const currentIndex = allPosts.findIndex((post) => post.id === currentPost.id);

        if (currentIndex > 0)
        {
            prevPost = allPosts[currentIndex - 1];
        }
        if (currentIndex < allPosts.length - 1)
        {
            nextPost = allPosts[currentIndex + 1];
        }

        response = currentPost;
    } catch (error)
    {
        return {
            props: {
                response: null,
                prevPost: null,
                nextPost: null,
                error: (error as Error).message,
            },
        };
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
