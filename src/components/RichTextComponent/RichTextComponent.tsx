import { Typography } from "@mui/material";
import React, { FC } from "react";

interface RichTextProps
{
    richText: string;
    className?: string;
}

export const RichTextComponent: FC<RichTextProps> = ({ richText, className }) =>
{
    return (
        <Typography variant="body1" component="div" className={className} dangerouslySetInnerHTML={{ __html: richText }} />
    );
};