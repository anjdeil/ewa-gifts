import React, { FC, ReactNode, useState } from "react";
import Header from "../Layouts/Header/Header";
import PopupContainer from "@/components/Popups/PopupContainer";
import { Footer } from "../Layouts";
import { useMediaQuery } from "@mui/material";
import BottomMenu from "../Layouts/BottomMenu";
import { createContext } from "react";
import { MenuItemsType } from "@/types/Services/customApi/Menu/MenuItemsType";
import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";

interface AppContextType
{
    menus: MenuItemsType[];
    categories: CategoryType[];
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface LayoutProps
{
    children: ReactNode,
    menus: MenuItemsType[],
    categories: CategoryType[],
    error: Error | null
}

const Layout: FC<LayoutProps> = ({ children, menus, categories, error }) =>
{
    const isMobile = useMediaQuery('(max-width: 768px)');

    if (error)
        throw new Error("Zaszła pomyłka");

    return (
        <>
            <AppContext.Provider value={{ menus, categories }}>
                <Header />
                <PopupContainer />
                {isMobile && (<BottomMenu />)}
                {children}
                <Footer />
            </AppContext.Provider>
        </>
    );
};

export default Layout;