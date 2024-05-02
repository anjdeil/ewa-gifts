import "@/styles/globals.scss";
import '@/styles/style.scss';
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { setupStore } from "@/store/store";
import { wrapper } from "@/store/store";
import wpRestApi from "@/services/WPRestAPI";
import { GetServerSideProps } from 'next';

const store = setupStore();

export function App({ Component, pageProps }: AppProps)
{
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default wrapper.withRedux(App);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async () =>
  {
    const params = {
      menus: "358"
    }

    try
    {
      const respone = await wpRestApi.getMenuItems(params);
      console.log(respone);
    } catch (error)
    {
      console.error(error);
    }

  }
);

