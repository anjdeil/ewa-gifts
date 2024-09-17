import React, { FC, ReactNode } from "react";
import Header from "../Layouts/Header/Header";
import PopupContainer from "@/components/Popups/PopupContainer";
import { Footer } from "../Layouts";
import { useMediaQuery } from "@mui/material";
import BottomMenu from "../Layouts/BottomMenu";
import { useFetchMenuItemsListQuery } from "@/store/custom/customApi";
import { createContext } from "react";
import { MenuItemsType } from "@/types/Services/customApi/Menu/MenuItemsType";

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
                <Header />
                <PopupContainer />
                {isMobile && (<BottomMenu />)}
                {children}
                <Footer />
            </MenusContext.Provider>
        </>
    );
};

export default Layout;
