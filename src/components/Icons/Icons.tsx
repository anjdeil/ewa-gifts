// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { Box, Grid } from "@mui/material";
import { HTMLAttributes } from 'react';

const Item: React.FC<HTMLAttributes> = (props) => <div {...props} />;

export const Icons = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(6)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Item>xs=2</Item>
                        <Item>xs=2</Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}