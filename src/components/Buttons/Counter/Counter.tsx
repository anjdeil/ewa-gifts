import { FC } from "react"
import styles from './styles.module.scss';
import { CounterProps } from "@/types";

export const Counter: FC<CounterProps> = ({ onClickHandler, count }) =>
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