import { BlogListProps } from "@/types/Blog";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { BlogList } from "../BlogList";
import styles from "./styles.module.scss";

export const BlogRelatedPosts: FC<BlogListProps> = ({ data = [] }) => {
    return (
        <Box className={styles.blogRelatedPosts}>
            <Typography
                variant="h5"
                component="h2"
                className={`secondary-title ${styles.blogRelatedPosts__title}`}
            >
                Powiązane posty
            </Typography>
            <BlogList data={data} />
        </Box>
    );
};
