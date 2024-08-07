import { Box, Chip } from "@mui/material";
import { FC } from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { BreadcrumbType } from "@/types/layouts/Breadcrumbs";

interface PageHeaderProps {
    title: string;
    breadLinks?: BreadcrumbType[],
    count?: number;
    isCentered?: boolean;
}
export const PageHeader: FC<PageHeaderProps> = ({ title, breadLinks, count = 0, isCentered = true }) => {
    return (
        <Box className={`page-top ${isCentered && "page-top_center"}`}>
            {breadLinks && <Breadcrumbs links={breadLinks} />}
            <Box className={'page-top__titling'}>
                <h1 className="page-top__title">{title}</h1>
                {count > 0 &&
                    <Chip
                        className="page-top__count"
                        label={count}
                        size="small"
                    />
                }
            </Box>
        </Box>
    )
}  