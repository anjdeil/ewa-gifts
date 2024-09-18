import "@/styles/globals.scss";
import '@/styles/style.scss';
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import { Provider } from "react-redux";
import { setupStore } from "@/store/store";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { ResponseMenuItemsType } from "@/types/Services/customApi/Menu/ResponseMenuItemsType";
import { ResponseCategoryListType } from "@/types/Services/customApi/Category/ResponseCategoryListType";
import axios, { AxiosResponse } from "axios";

const store = setupStore();
const menuIds = [820, 818, 817, 816, 358];

type response = {
    menus: ResponseMenuItemsType | null,
    categories: ResponseCategoryListType | null,
    error: Error | null
}

type AppOwnProps = {
    response: response
};

const MyApp = ({ Component, pageProps, response }: AppProps & AppOwnProps) =>
{
    const menus = response?.menus?.data?.items ? response.menus.data.items : [];
    const categories = response?.categories?.data?.items ? response.categories.data.items : [];

    return (
        <Provider store={store}>
            <Layout menus={menus} categories={categories} error={response.error}>
                <ErrorBoundary>
                    <Component {...pageProps} />
                </ErrorBoundary>
            </Layout>
        </Provider>
    );
};

MyApp.getInitialProps = async () =>
{
    const response: response = {
        menus: null,
        categories: null,
        error: null
    };

    try
    {
        const [menus, categories]: [AxiosResponse, AxiosResponse] = await Promise.all([
            axios.get('https://api.ewagifts.pl/api/v2/menu-items', { params: { include: menuIds.join(',') } }),
            axios.get('https://api.ewagifts.pl/api/v2/categories'),
        ]);

        if (menus.status === 200 && menus?.data)
            response.menus = menus.data;

        if (categories.status === 200 && categories?.data)
            response.categories = categories.data;

        return { response: response };

    } catch (err)
    {
        console.error(err);
        return { response: { ...response, error: err } };
    }
};

export default MyApp;