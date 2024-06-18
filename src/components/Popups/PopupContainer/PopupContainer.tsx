import React, { useEffect } from "react";
import { popupClosed } from "@/store/reducers/PopupSlice";
import { useDispatch, useSelector } from "react-redux";
import MobileSearchPopup from "@/components/Popups/MobileSearchPopup";
import HamburgerMenu from "@/components/Popups/HamburgerMenu";
import MobileSidebar from "@/components/Shop/ShopSidebar/MobileSidebar";
import SwiperPopup from "@/components/Popups/SwiperPopup/SwiperPopup";

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
        case 'mobile-filter': {
            return (
                <MobileSidebar />
            )
        }
        case 'swiper-popup': {
            return (
                <SwiperPopup onClose={closePopup} />
            )
        }
    }
}

export default PopupContainer;