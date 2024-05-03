import "@/styles/globals.scss";
import '@/styles/style.scss';
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { setupStore } from "@/store/store";

const store = setupStore();

export function App({ Component, pageProps }: AppProps)
{
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App;
