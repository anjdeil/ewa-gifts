import { BreadcrumbsProps } from "@/types/layouts/Breadcrumbs";
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import styles from "./styles.module.scss";

const Breadcrumbs: FC<BreadcrumbsProps> = ({ links }) => {

    return (
        <MuiBreadcrumbs aria-label="Breadcrumbs" className={styles['breadcrumbs']}>
            <Link className={styles['breadcrumbs__link']} href={'/'}>Główna</Link>
            {
                links?.map(({ name, url }, i, links) => {
                    if (i === links.length - 1) {
                        return (
                            <Typography key={i}>{name}</Typography>
                        )
                    } else {
                        return (
                            <Link key={i} className={styles['breadcrumbs__link']} href={url}>{name}</Link>
                        )
                    }
                })
            }
        </MuiBreadcrumbs>
    );
}

export default Breadcrumbs;