import React from "react";
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import styles from "./styles.module.scss";

const Breadcrumbs = ({ links }) => {

    return (
        <MuiBreadcrumbs aria-label="Breadcrumbs">
            {
                links?.map(({ name, url, isCurrent }) => {
                    if (isCurrent) {
                        return (
                            <Typography>{name}</Typography>
                        )
                    } else {
                        return (
                            <Link className={styles['breadcrumbs__link']} href={url}>{name}</Link>
                        )
                    }
                })
            }
        </MuiBreadcrumbs>
    );
}

export default Breadcrumbs;