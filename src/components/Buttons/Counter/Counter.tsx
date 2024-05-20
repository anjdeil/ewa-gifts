import { FC } from "react"
import { z } from "zod"
import styles from './style.module.scss';

const CounterSchema = z.object({
    onClickHandler: z.function().args(z.any()).returns(z.void()),
    count: z.number()
});

type CounterType = z.infer<typeof CounterSchema>;

export const Counter: FC<CounterType> = ({ onClickHandler, count }) =>
{
    return (
        <div className={styles.counter}>
            <button
                className={styles.counter__buttons}
                onClick={() => onClickHandler(--count)}
            >
                <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1H15" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
            <span className={styles.counter__window}>{count}</span>
            <button
                className={styles.counter__buttons}
                onClick={() => onClickHandler(++count)}>
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0.833496V17.1668M1 9.00016H15" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    )
}