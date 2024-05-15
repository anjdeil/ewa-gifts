import { FC } from "react";

interface ChangeQuantityStateBtnProps
{
    onClickHandler: () => void;
    className: string;
    disabled: boolean;
}

export const ChangeQuantityStateBtn: FC<ChangeQuantityStateBtnProps> = ({ onClickHandler, className, disabled = false }) => (
    <button
        className={`${className} btn`}
        onClick={() => onClickHandler()}
        disabled={disabled}
    >
        Add to card
    </button >
);