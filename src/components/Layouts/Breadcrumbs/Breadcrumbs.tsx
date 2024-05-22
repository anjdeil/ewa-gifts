import React from "react";
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import styles from "./styles.module.scss";

const Breadcrumbs = ({ links }) => {

    return (
        <MuiBreadcrumbs aria-label="Breadcrumbs">
            {
                links?.map(({ name, url, isCurrent }, i) => {
                    if (isCurrent) {
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