import { BlogNavPosts } from "@/components/Blog/BlogNavPosts";
import { BlogPost } from "@/components/Blog/BlogPost";
import { BlogRelatedPosts } from "@/components/Blog/BlogRelatedPosts";
import { Section } from "@/components/Layouts/Section";
import { domain } from "@/constants";
import { customRestApi } from "@/services/CustomRestApi";
import { BlogItemSchema, BlogItemType } from "@/types/Blog";
import { responseMultipleCustomApi } from "@/types/Services/customApi";
import { getCanonicalLink } from "@/Utils/getCanonicalLink";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect, useMemo } from "react";
import { z } from "zod";

const ArticlePropsSchema = z.object({
    response: BlogItemSchema,
    prevPost: BlogItemSchema.nullable(),
    nextPost: BlogItemSchema.nullable(),
    relatedPosts: z.array(BlogItemSchema).optional(),
    error: z.string().optional(),
});

const fetchPostData = async (slug: string) =>
{
    const response = await customRestApi.get(`posts/${slug}`);
    if (response && response.data)
    {
        return (response.data as { data: { item: BlogItemType } }).data.item;
    } else
    {
        throw new Error("Failed to fetch post data.");
    }
};

type ArticleProps = z.infer<typeof ArticlePropsSchema>;

const Article: FC<ArticleProps> = ({
    response,
    prevPost,
    nextPost,
    relatedPosts,
    error,
}) =>
{
    const router = useRouter();

    if (error) throw new Error(error);

    const canonicalUrl = useMemo(() => getCanonicalLink(router.asPath, domain), [router.asPath]);

    /** Get seo data for the current category */
    const { title, description, open_graph, twitter, bot } = response.seo_data || {};
    // Open graph
    const { title: graphTitle, description: graphDesc, image: graphImage, image_meta: graphImageMeta } = open_graph || {};
    const { width, height } = graphImageMeta || {};
    // Twitter
    const { title: twitTitle, description: twitDesc, image: twitImage } = twitter || {};

    return (
        <>
            <Head>
                {/* Standard Meta Tags */}
                <title>{title || ""}</title>
                <meta name="description" content={description || response.title} />
                {bot?.is_no_index && <meta name="robots" content="noindex" />}
                <link rel="canonical" href={canonicalUrl} />
                {/* Open Graph Meta Tags */}
                <meta property="og:type" content="website" />
                {graphTitle && <meta property="og:title" content={graphTitle} />}
                {graphDesc && <meta property="og:description" content={graphDesc} />}
                {graphImage && <meta property="og:image" content={graphImage} />}
                {width && <meta property="og:image:width" content={width.toString()} />}
                {height && <meta property="og:image:height" content={height.toString()} />}
                {/* Optional Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                {twitTitle && <meta name="twitter:title" content={twitTitle} />}
                {twitDesc && <meta name="twitter:description" content={twitDesc} />}
                {twitImage && <meta name="twitter:image" content={twitImage} />}
            </Head>
            <main>
                <Section className={"container"}>
                    <BlogPost post={response} />
                    <BlogNavPosts prevPost={prevPost} nextPost={nextPost} />
                    <BlogRelatedPosts data={relatedPosts} />
                </Section>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) =>
{
    const { slug } = context.params!;
    let response: BlogItemType | null = null;
    let prevPost: BlogItemType | null = null;
    let nextPost: BlogItemType | null = null;
    let relatedPosts: BlogItemType[] = [];
    let error: string | null = null;

    try
    {
        response = await fetchPostData(slug as string);

        const [prevPostPromise, nextPostPromise] = await Promise.all([
            response.prev_post ? fetchPostData(response.prev_post) : null,
            response.next_post ? fetchPostData(response.next_post) : null,
        ]);

        prevPost = prevPostPromise;
        nextPost = nextPostPromise;

        const morePostsResponse = await customRestApi.get("posts", { per_page: 3 });
        if (morePostsResponse && morePostsResponse.data)
        {
            const posts = (morePostsResponse.data as responseMultipleCustomApi)
                .data.items;

            relatedPosts = posts
                .filter((post) => post.slug !== slug)
                .slice(0, 2);
        }
    } catch (err)
    {
        if (err instanceof Error)
        {
            error = err.message;
        } else
        {
            error = "Server Error.";
        }
    }

    return {
        props: {
            response,
            prevPost,
            nextPost,
            relatedPosts,
            error,
        },
    };
};

export default Article;
