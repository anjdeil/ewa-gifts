// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import "@/styles/globals.scss";
import '@/styles/style.scss';
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import { Provider } from "react-redux";
import { setupStore } from "@/store/store";

const store = setupStore();

export function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default App;
