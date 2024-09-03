import "@/styles/globals.scss";
import '@/styles/style.scss';
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import { Provider } from "react-redux";
import { setupStore } from "@/store/store";
import { MenuItemsType } from "@/types/Services/customApi/Menu/MenuItemsType";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";


const store = setupStore();

type AppOwnProps = { menus: MenuItemsType[] };

export const MyApp = ({ Component, pageProps }: AppProps & AppOwnProps) =>
{


    return (
        <Provider store={store}>
            <Layout>
                <ErrorBoundary>
                    <Component {...pageProps} />
                </ErrorBoundary>
            </Layout>
        </Provider>
    )
}

export default MyApp;
