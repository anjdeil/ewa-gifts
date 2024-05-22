import React, { FC, useEffect } from "react";
import Header from "../Layouts/Header/Header";
import TopBar from "../Layouts/TopBar/TopBar";
import PopupContainer from "@/components/Popups/PopupContainer";
import { useFetchMenuItemsQuery } from "@/store/wordpress/wpAPI";
import { wpNavLinks } from "@/types/Menus";


const Layout: FC = ({ children }) => {

    const { isError, error, isLoading, data } = useFetchMenuItemsQuery({ menus: "358" });

    const navLinks: wpNavLinks = {
        data,
        error,
        isError,
        isLoading,
    }

    return (
        <>
            <TopBar navLinks={navLinks} socials={navLinks} />
            <Header />
            <PopupContainer />
            {children}
        </>
    );
};

export default Layout;
