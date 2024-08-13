import React, { FC, ReactNode } from "react";
import Header from "../Layouts/Header/Header";
import TopBar from "../Layouts/TopBar/TopBar";
import PopupContainer from "@/components/Popups/PopupContainer";
import { Footer } from "../Layouts";
import { useMediaQuery } from "@mui/material";
import MobileHeader from "../Layouts/MobileHeader/MobileHeader";
import BottomMenu from "../Layouts/BottomMenu";
import { useFetchMenuItemsListQuery } from "@/store/custom/customApi";
import { createContext } from "react";
import { MenuItemsType } from "@/types/Services/customApi/Menu/MenuItemsType";
import { ResponseMenuItemsType } from "@/types/Services/customApi/Menu/ResponseMenuItemsType";

export const MenusContext = createContext<MenuItemsType[] | undefined>(undefined);

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const menuIds = [820, 818, 817, 816, 358];

    const { data: menusData } = useFetchMenuItemsListQuery({
        include: menuIds.join(',')
    });

    const menus = menusData?.data ? menusData.data.items as MenuItemsType[] : [];

    return (
        <>
            <MenusContext.Provider value={menus}>

                {!isMobile && <TopBar />}
                {!isMobile ? <Header /> : <MobileHeader />}
                <PopupContainer />
                {isMobile && (<BottomMenu />)}
                {children}
                <Footer />
            </MenusContext.Provider>
        </>
    );
};

export default Layout;
