import { BlogListType } from "@/types";
import { FC } from "react";
import { Grid } from "@mui/material";
import { BlogListItem } from "../BlogListItem";

interface BlogListProps
{
    data: BlogListType;
}

export const BlogList: FC<BlogListProps> = ({ data }) =>
{
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {data.map((post, index) => (
                <Grid item xs={12} sm={6} key={index} style={{ marginBottom: '20px' }}>
                    <BlogListItem post={post} />
                </Grid>
            ))}
        </Grid>
    )
}