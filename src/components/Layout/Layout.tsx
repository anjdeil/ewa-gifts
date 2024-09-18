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
    const [cachedMenu, setCachedMenu] = useState<MenuItemsType[]>([]);
    const [cachedCategories, setCachedCategories] = useState<CategoryType[]>([]);

    if (menus.length > 0 && cachedMenu.length === 0)
        setCachedMenu(menus);

    if (menus.length > 0 && cachedCategories.length === 0)
        setCachedCategories(categories);

    if (error)
        throw new Error("Zaszła pomyłka");

    return (
        <>
            <AppContext.Provider value={{ menus: cachedMenu, categories: cachedCategories }}>
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