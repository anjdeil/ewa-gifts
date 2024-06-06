import React, { FC, useEffect, useRef, useState } from "react";
import styles from './styles.module.scss';
import { CounterProps } from "@/types";
import { CircularProgress, Input, Skeleton } from "@mui/material";

export const Counter: FC<CounterProps> = ({ count, changeQuantity, isLoading }) =>
{
    const [localCount, setLocalCount] = useState(count);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() =>
    {
        setLocalCount(count);
    }, [count]);

    useEffect(() =>
    {
        if (timerRef.current)
        {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() =>
        {
            changeQuantity(localCount);
        }, 1000);

        changeQuantity(localCount);

        // return () =>
        // {
        //     if (timerRef.current)
        //     {
        //         clearTimeout(timerRef.current);
        //     }
        // };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localCount]);

    const increment = () =>
    {
        setLocalCount(prevCount => prevCount + 1);
    };

    const decrement = () =>
    {
        setLocalCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue))
        {
            setLocalCount(newValue);
        }
    }

    return (
        <div className={styles.counter}>
            <button
                className={styles.counter__buttons}
                onClick={decrement}>
                <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1H15" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            {isLoading
                ?
                <Skeleton
                    height={'35px'}
                    animation="wave"
                    className={styles.counter__window}
                />
                //     {localCount}
                // </Skeleton>
                :
                <Input
                    value={localCount}
                    onChange={onInputChange}
                    className={styles.counter__window}
                    type="number"
                />
            }
            <button
                className={styles.counter__buttons}
                onClick={increment}>
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0.833496V17.1668M1 9.00016H15" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
};