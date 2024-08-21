// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { Box, LinearProgress } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { z } from "zod";

export const ProgressBarPropsSchema = z.object({
    isLoading: z.boolean().nullable()
});

export type ProgressBarProps = z.infer<typeof ProgressBarPropsSchema>;


export const ProgressBar: FC<ProgressBarProps> = ({ isLoading }) =>
{
    const [progress, setProgress] = useState(0);
    const [buffer] = useState(10);

    useEffect(() =>
    {
        let progressTimer: NodeJS.Timeout;
        if (isLoading)
        {
            progressTimer = setInterval(() =>
            {
                setProgress((oldProgress) =>
                {
                    if (oldProgress === 80)
                    {
                        clearInterval(progressTimer);
                        return oldProgress;
                    }
                    const diff = Math.random() * 10;
                    return Math.min(oldProgress + diff, 80);
                });
            }, 500);
        } else
        {
            setProgress(100);
        }
        return () =>
        {
            clearInterval(progressTimer);
        };
    }, [isLoading]);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
        </Box>
    );
};
