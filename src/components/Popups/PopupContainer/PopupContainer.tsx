import React, { useEffect } from "react";
import { popupClosed } from "@/store/reducers/PopupSlice";
import { useDispatch } from "react-redux";
import MobileSearchPopup from "@/components/Popups/MobileSearchPopup";
import HamburgerMenu from "@/components/Popups/HamburgerMenu";
import SwiperPopup from "@/components/Popups/SwiperPopup/SwiperPopup";
import { useAppSelector } from "@/hooks/redux";
import MobileCartPopup from "../MobileCartPopup";
import MobileCategoriesMenu from "../MobileCategoriesMenu";
import { usePathname } from "next/navigation";

const unscrollablePopups = ['mobile-search', 'hamburger-menu', 'swiper-popup', 'mobile-cart', 'mobile-categories'];

const PopupContainer = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();

    const popup = useAppSelector(state => state.Popup);

    useEffect(() => {
        dispatch(popupClosed());

        let firstClick = true;

        const handleClick = (event: MouseEvent) => {
            const somePopupOpen = Boolean(document.querySelector(".close-outside"));
            if (!somePopupOpen) {
                firstClick = true;
                return;
            }

            if (firstClick) {
                firstClick = false;
                return;
            }

            const target = event.target as HTMLElement;
            const targetPopup = target?.closest(".close-outside");
            if (!targetPopup) {
                firstClick = true;
                dispatch(popupClosed());
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [pathname]);

    useEffect(() => {
        if (unscrollablePopups.some(popupName => popup === popupName)) {
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
        case 'swiper-popup': {
            return (
                <SwiperPopup onClose={closePopup} />
            )
        }
        case 'mobile-cart': {
            return (
                <MobileCartPopup onClose={closePopup} />
            )
        }
        case 'mobile-categories': {
            return (
                <MobileCategoriesMenu onClose={closePopup} />
            )
        }
    }
}

export default PopupContainer;