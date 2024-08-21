import { AddButtonProps } from "@/types/Buttons";
import { FC } from "react";
import styles from './styles.module.scss';

export const AddButton: FC<AddButtonProps> = ({ onClickHandler, className, disabled = false }) => (
    <button
        className={`${styles.addButton} ${className} btn`}
        onClick={onClickHandler}
        disabled={disabled}
    >
        Do koszyka
    </button >
);