import React, { FC, useEffect, useState } from "react";
import styles from './styles.module.scss';
import { CounterProps } from "@/types";
import { IconButton, Input } from "@mui/material";
export const Counter: FC<CounterProps> = ({ count, onCountChange, currentProduct }) =>
{
    const [localCount, setLocalCount] = useState<number | null>(count);

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (event.target.value) setLocalCount(Number(event.target.value));
    }

    const onLocalCountChange = (count: number) =>
    {
        if (count >= 0)
        {
            setLocalCount(count);
        }
    }

    useEffect(() =>
    {
        if (localCount && localCount >= 0)
        {
            onCountChange(localCount, currentProduct)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localCount])

    return (
        <div className={styles.counter}>
            <IconButton size="large" aria-label="delete" onClick={() => onLocalCountChange(--count)} >
                <svg width="16" height="16" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1H15" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </IconButton>
            <Input
                value={count}
                onChange={onInputChange}
                className={styles.counter__window}
                type="number"
            />
            <IconButton size="large" aria-label="delete" onClick={() => onLocalCountChange(++count)} >
                <svg width="16" height="16" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0.833496V17.1668M1 9.00016H15" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </IconButton>
        </div>
    );
};