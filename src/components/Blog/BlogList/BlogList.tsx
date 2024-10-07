import { Loader } from "@/components/Layouts/Loader";
import { useFetchPostsQuery } from "@/store/custom/customApi";
import { BlogItemType, BlogListProps } from "@/types/Blog";
import { WpWooError } from "@/types/Services";
import { Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { BlogListItem } from "../BlogListItem";
import styles from "./styles.module.scss";

const perPage = 4;

export const BlogList: FC<BlogListProps> = ({ data = [] }) => {
    const [posts, setPosts] = useState<BlogItemType[]>(data);
    const {
        data: fetchedPosts,
        isLoading,
        isError,
        error,
    } = useFetchPostsQuery(
        { per_page: perPage },
        {
            skip: data.length > 0,
        }
    );

    useEffect(() => {
        if (data.length > 0) {
            setPosts(data);
        } else if (fetchedPosts) {
            setPosts(fetchedPosts.data?.items || []);
        }
    }, [data, fetchedPosts]);

    const errorMessage = isError
        ? (error as WpWooError).data?.message || "An error occurred"
        : undefined;

    if (isLoading && data.length === 0)
        return <Loader thickness={5} size={24} />;
    if (errorMessage && data.length === 0) return <p>Error: {errorMessage}</p>;

    return (
        <Grid
            container
            rowSpacing={{ xs: 3, md: 6 }}
            columnSpacing={{ sm: "20px" }}
            className={styles.blogList}
        >
            {posts?.map((post: BlogItemType, index: number) => (
                <Grid item xs={12} sm={6} key={index}>
                    <BlogListItem post={post} key={post.id} />
                </Grid>
            ))}
        </Grid>
    );
};