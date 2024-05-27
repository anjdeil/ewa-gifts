import React, { FC } from "react";
import styles from "./styles.module.scss";
import Nav from "@/components/Layouts/Navigation/Nav";

const HamburgerMenu: FC = ({ onClose }) => {

    return (
        <div className={styles["hamburger-menu"]}>
            <div className={styles["hamburger-menu__header"]}>
                <button onClick={onClose} aria-label="Close hamburger menu" className={styles["hamburger-menu__close"]}>
                    <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 1L1 13M1 1L13 13" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            <div className={styles['hamburger-menu__nav-wrap']}>
                <Nav
                    menuId={816}
                    className={styles['hamburger-menu__nav']}
                    skeleton={
                        {
                            isColumn: true,
                            elements: 5,
                            width: "100%",
                            height: "40px",
                            gap: '10px'
                        }
                    }
                />
            </div>
        </div >
    );
}

export default HamburgerMenu;