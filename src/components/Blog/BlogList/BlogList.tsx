import { FC, useMemo } from "react";
import { Grid } from "@mui/material";
import { BlogListItem } from "../BlogListItem";
import { BlogItemType, BlogListProps } from "@/types/Blog";
import { useFetchAllBlogPostsQuery } from "@/store/wordpress";
import { transformBlogCard } from "@/services/transformers";

export const BlogList: FC<BlogListProps> = ({ data }) =>
{
    const { data: fetchedBlogPosts, isError } = useFetchAllBlogPostsQuery(undefined, {
        skip: !!data,
    });

    const blogPosts = useMemo(() =>
    {
        const posts = data || fetchedBlogPosts || [];
        return transformBlogCard(posts);

    }, [data, fetchedBlogPosts]);

    if (isError)
    {
        return <h3>Blog posts not found.</h3>;
    }

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {blogPosts.map((post: BlogItemType, index: number) => (
                <Grid item xs={12} sm={6} key={index} style={{ marginBottom: '20px' }}>
                    <BlogListItem post={post} />
                </Grid>
            ))}
        </Grid>
    );
};
