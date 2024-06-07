import React from "react";
import { Button, useScrollTrigger, useMediaQuery } from "@mui/material";
import variables from "@/styles/variables.module.scss";
import { popupSet } from "@/store/reducers/PopupSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/redux";
import styles from "./styles.module.scss";

const ShopToolbar = ({ renderPagination }) => {
    const dispatch = useDispatch()
    const popup = useAppSelector(state => state.Popup);

    const isMobile = useMediaQuery('(max-width: 768px)');

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 220
    });

    const onToggleSidebar = () => {
        if (popup === 'mobile-filter') {
            dispatch(popupSet(''));
        } else {
            dispatch(popupSet('mobile-filter'));
        }
    }

    return (
        <div className={`${styles['shop-toolbar']} ${isMobile && (trigger || popup === 'mobile-filter') ? styles['shop-toolbar_fixed'] : ''}`}>
            <div className={styles['shop-toolbar__sort']}>
                <div></div>
                {isMobile && (
                    <Button
                        onClick={onToggleSidebar}
                        aria-label={popup === 'mobile-filter' ? "Close filter" : "Open filter"}
                        sx={{
                            backgroundColor: popup === 'mobile-filter' ? variables.blackColor : variables.inputLight,
                            color: variables.textGray,
                            padding: '0',
                            borderRadius: '10px',
                            minWidth: 'auto',
                            height: '38px',
                            width: '38px',
                            '&:hover': {
                                backgroundColor: popup === 'mobile-filter' ? variables.blackColor : variables.inputLight,
                            }
                        }}
                    >
                        {popup === 'mobile-filter' ? (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 1L1 13M1 1L13 13" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg aria-hidden="false" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 3L17 3M0.999999 17L4 17M1 3L5 3M8 17L17 17M14 10L17 10M1 10L10 10" stroke="black" strokeLinecap="round" />
                                <path d="M5 3C5 4.10457 5.89543 5 7 5C8.10457 5 9 4.10457 9 3C9 1.89543 8.10457 1 7 1C5.89543 1 5 1.89543 5 3Z" stroke="black" strokeLinecap="round" />
                                <path d="M10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10Z" stroke="black" strokeLinecap="round" />
                                <path d="M4 17C4 18.1046 4.89543 19 6 19C7.10457 19 8 18.1046 8 17C8 15.8954 7.10457 15 6 15C4.89543 15 4 15.8954 4 17Z" stroke="black" strokeLinecap="round" />
                            </svg>
                        )}
                    </Button>
                )}
            </div>
            <div className={styles['shop-toolbar__pagination']}>
                {renderPagination()}
            </div>
        </div>
    );
}

export default ShopToolbar;