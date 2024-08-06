import "@/styles/globals.scss";
import '@/styles/style.scss';
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import { Provider } from "react-redux";
import { setupStore } from "@/store/store";
import { MenuItemsType } from "@/types/Services/customApi/Menu/MenuItemsType";
import { customRestApi } from "@/services/CustomRestApi";
import { ResponseMenuItemsType } from "@/types/Services/customApi/Menu/ResponseMenuItemsType";
import App from "next/app";
import { createContext } from "react";

export const MenusContext = createContext<MenuItemsType[] | undefined>(undefined);

const store = setupStore();

type AppOwnProps = { menus: MenuItemsType[] };

export const MyApp = ({ Component, pageProps, menus }: AppProps & AppOwnProps) => {
    return (
        <Provider store={store}>
            <MenusContext.Provider value={menus}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </MenusContext.Provider>
        </Provider>
    )
}

MyApp.getInitialProps = async (ctx: AppContext): Promise<AppInitialProps & AppOwnProps> => {
    const appProps = await App.getInitialProps(ctx);

    const menuIds = [820, 818, 817, 819, 816, 358];

    const menusResponseData = await customRestApi.get(`menu-items`, {
        include: menuIds.join(',')
    });
    const menusResponse = menusResponseData?.data as ResponseMenuItemsType;
    const menus = menusResponse?.data ? menusResponse.data.items as MenuItemsType[] : [];

    return {
        ...appProps,
        menus
    }
}

export default MyApp;
