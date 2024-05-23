import React, { useEffect } from "react";
import { popupClosed } from "@/store/reducers/PopupSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MobileSearchPopup from "@/components/Popups/MobileSearchPopup";

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
    }
}

export default PopupContainer;