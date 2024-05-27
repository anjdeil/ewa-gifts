import React, { useEffect } from "react";
import { popupClosed } from "@/store/reducers/PopupSlice";
import { useDispatch, useSelector } from "react-redux";
import MobileSearchPopup from "@/components/Popups/MobileSearchPopup";
import HamburgerMenu from "@/components/Popups/HamburgerMenu";

const PopupContainer = () => {
    const dispatch = useDispatch();

    const popup = useSelector(state => state.Popup);

    useEffect(() => {
        if (popup) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [popup]);

    const closePopup = () => {
        dispatch(popupClosed());
    }

    switch (popup) {
        case 'mobile-search': {
            return (
                <MobileSearchPopup onClose={closePopup} />
            )
        }
        case 'hamburger-menu': {
            return (
                <HamburgerMenu onClose={closePopup} />
            )
        }
    }
}

export default PopupContainer;