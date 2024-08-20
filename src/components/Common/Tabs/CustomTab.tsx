import { PageBuilder } from "@/components/PageBuilder";
import { CustomTabType } from "@/types";
import { Box } from "@mui/material";
import { FC } from 'react';

export const CustomTab: FC<CustomTabType> = ({ sections, index, value }) => 
{
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <PageBuilder isContainer={false} sections={sections} />
                </Box>
            )}
        </div>
    );
}