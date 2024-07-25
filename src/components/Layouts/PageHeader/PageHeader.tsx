import { Box, Typography } from "@mui/material";
import { FC } from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { BreadcrumbType } from "@/types/layouts/Breadcrumbs";

interface PageHeaderProps
{
    title: string;
    breadLinks: BreadcrumbType[],
    count?: number;
    isCentered?: boolean;
}
export const PageHeader: FC<PageHeaderProps> = ({ title, breadLinks, count = 0, isCentered = true }) =>
{
    return (
        <Box className={`page-top ${isCentered && "page-top_center"}`}>
            <Breadcrumbs links={breadLinks} />
            <Box className={'page-top__titling'}>
                <Typography className="main-title" variant="h1">{title}</Typography>
                {count > 0 &&
                    <span className="page-top__count">
                        {count}
                    </span>
                }
            </Box>
        </Box>
    )
}  