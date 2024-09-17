import { FC } from "react";
import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { BlogList } from "../BlogList";
import { BlogListProps } from "@/types/Blog";

export const BlogRelatedPosts: FC<BlogListProps> = ({ data = [] }) => {
    return (
        <Box className={styles.blogRelatedPosts}>
            <Typography
                variant="h5"
                component="h2"
                className={`sub-title ${styles.blogRelatedPosts__title}`}
            >
                Related Post
            </Typography>
            <BlogList data={data} />
        </Box>
    );
};
