import React, { useEffect, useState } from "react";
import "./styles.module.scss";
import Link from "next/link";
import { Badge, IconButton } from "@mui/material";
import Image from "next/image";
import MiniCartPopup from "@/components/Popups/MiniCartPopup";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { popupClosed, popupSet } from "@/store/reducers/PopupSlice";
import variables from "@/styles/variables.module.scss";
import styles from "./styles.module.scss";

const HeaderIconButtons = () => {
    const dispatch = useAppDispatch();
    const { items: cartItems } = useAppSelector(state => state.Cart);
    const popup = useAppSelector(state => state.Popup);
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        setCartItemsCount(cartItems.length);
    }, [cartItems]);

    const toggleMiniCart = () => {
        if (popup === 'mini-cart') {
            dispatch(popupClosed());
        } else {
            dispatch(popupSet('mini-cart'));
        }
    }

    return (
        <div className={styles["header-icon-buttons"]}>

            <Link href={'/my-account/wishlist'}>
                <IconButton>
                    <Image
                        src={'/images/header-icons/wishlist-icon.svg'}
                        alt={'Wishlist'}
                        width={24}
                        height={24}
                        unoptimized={true}
                    />
                </IconButton>
            </Link>

            <Link href={'/my-account'}>
                <IconButton>
                    <Image
                        src={'/images/header-icons/account-icon.svg'}
                        alt={'Account'}
                        width={24}
                        height={24}
                        unoptimized={true}
                    />
                </IconButton>
            </Link>

            <IconButton onClick={() => toggleMiniCart()}>
                <Badge
                    badgeContent={cartItemsCount}
                    color="primary"
                    sx={{
                        ".MuiBadge-badge": {
                            fontSize: ".5em",
                            width: "18px",
                            height: "18px",
                            color: variables.blackColor,
                            backgroundColor: variables.accent
                        }
                    }}
                >
                    <Image
                        src={'/images/header-icons/cart-icon.svg'}
                        alt={'Cart'}
                        width={24}
                        height={24}
                        unoptimized={true}
                    />
                </Badge>
            </IconButton>
            {popup === 'mini-cart' && (<MiniCartPopup />)}
        </div>
    );
}

export default HeaderIconButtons;