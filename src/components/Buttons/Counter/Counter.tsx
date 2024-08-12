import React, { FC, useState } from "react";
import styles from './styles.module.scss';
import { CounterProps } from "@/types";
import { IconButton, Input } from "@mui/material";

export const Counter: FC<CounterProps> = ({ value, min = 0, max, onCountChange, isLoading = false }) => {
    const [localCount, setLocalCount] = useState<number>(value);

    const changeLocalCount = (count: number) => {
        if (isLoading) return;

        let newCount = count;
        if (count < min) newCount = min;
        if (count > max) newCount = max;

        onCountChange(newCount);
        setLocalCount(newCount);
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) changeLocalCount(Number(event.target.value));
    }

    return (
        <div className={`${styles.counter} ${isLoading && styles.counter_loading}`}>
            <IconButton
                className={styles.counter__button}
                size="large"
                aria-label="delete"
                onClick={() => changeLocalCount(localCount - 1)}
            >
                <svg width="16" height="16" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1H15" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </IconButton>
            <Input
                value={localCount}
                onChange={onInputChange}
                className={styles.counter__window}
                type="number"
            />
            <IconButton
                className={styles.counter__button}
                size="large"
                aria-label="delete"
                onClick={() => changeLocalCount(localCount + 1)}
            >
                <svg width="16" height="16" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0.833496V17.1668M1 9.00016H15" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </IconButton>
        </div>
    );
};