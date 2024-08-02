import React, { FC } from "react";
import styles from "./styles.module.scss";
import Nav from "@/components/Layouts/Navigation/Nav";
import { PopupType } from "@/types/Popups/PopupType";
import MobilePopup from "../MobilePopup";

const HamburgerMenu: FC<PopupType> = ({ onClose }) => {

    return (
        <MobilePopup onClose={onClose}>
            <div className={styles['hamburger-menu__nav-wrap']}>
                <Nav
                    menuId={816}
                    className={styles['hamburger-menu__nav']}
                    skeleton={
                        {
                            isColumn: true,
                            elements: 5,
                            width: "200px",
                            height: "40px",
                            gap: '10px'
                        }
                    }
                />
            </div>
        </MobilePopup>
    );
}

export default HamburgerMenu;