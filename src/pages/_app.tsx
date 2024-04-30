import { setupStore } from "@/store/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "@/styles/globals.scss";
import '@/styles/style.scss';

const store = setupStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
       <Component {...pageProps} />
    </Provider>
  )
}
