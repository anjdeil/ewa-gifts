import { Typography } from "@mui/material";
import React, { FC } from "react";

interface RichTextProps
{
    richText: string;
}

export const RichTextComponent: FC<RichTextProps> = ({ richText }) =>
{
    return (
        <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: richText }} />
    );
};