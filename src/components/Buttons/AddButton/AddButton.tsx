import { AddButtonProps } from "@/types";
import { FC } from "react";
import styles from './style.module.scss';

export const AddButton: FC<AddButtonProps> = ({ onClickHandler, className, disabled = false }) => (
    <button
        className={`${styles.addButton} ${className} btn`}
        onClick={() => onClickHandler()}
        disabled={disabled}
    >
        Add to card
    </button >
);