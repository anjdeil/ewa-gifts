import React, { FC, ReactElement } from "react";
import styles from "./styles.module.scss";

interface MobilePopupPropsType {
    onClose: () => void,
    title?: string | ReactElement,
    children: ReactElement
}

const MobilePopup: FC<MobilePopupPropsType> = ({ onClose, title = "", children }) => {
    return (
        <div className={styles["mobile-popup"]}>
            <div className={styles["mobile-popup__header"]}>
                <div className="secondary-title">{title}</div>
                <button onClick={onClose} aria-label="Close hamburger menu" className={styles["mobile-popup__close"]}>
                    <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 1L1 13M1 1L13 13" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            <div className={styles["mobile-popup__content"]}>
                {children}
            </div>
        </div>
    )
}

export default MobilePopup;