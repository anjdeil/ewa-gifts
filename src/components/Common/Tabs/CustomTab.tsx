import { CustomTabType } from "@/types";
import { Box } from "@mui/material";
import { FC } from 'react';

export const CustomTab: FC<CustomTabType> = ({ children, index, value }) => 
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
                    {children}
                </Box>
            )}
        </div>
    );
}