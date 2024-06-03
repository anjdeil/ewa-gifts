import { RichTextProps } from "@/types";
import Link from "next/link";
import React, { FC } from "react";
import styles from './styles.module.scss';

export const RichTextComponent: FC<RichTextProps> = ({ link_text, link_url, text, title, className }) =>
{
    return (
        <div className={className}>
            <h3 className={`sub-title ${styles.richText__title}`} >{title}</h3>
            <div
                dangerouslySetInnerHTML={{ __html: text }}
                className={`desc ${styles.richText__text}`}
            />
            {link_url && <Link className="more-link" href={link_url}>{link_text}</Link>}
        </div>
    );
};