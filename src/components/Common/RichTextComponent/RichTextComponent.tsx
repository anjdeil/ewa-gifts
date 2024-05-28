import { RichTextProps } from "@/types";
import { Typography } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";

export const RichTextComponent: FC<RichTextProps> = ({ link_text, link_url, text, title, className }) =>
{
    return (
        <div className={className}>
            <h3 className="sub-title" style={{ marginBottom: "20px" }}>{title}</h3>
            <Typography marginBottom={'20px'} variant="body1" component="div" dangerouslySetInnerHTML={{ __html: text }} />
            {link_url && <Link className="more-link" href={link_url}>{link_text}</Link>}
        </div>
    );
};