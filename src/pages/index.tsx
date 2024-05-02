import TopBar from "@/components/TopBar/TopBar";
import Head from "next/head";
import { fetchMenuItems } from "@/services/NavServices";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { wrapper } from "@/store/store";
import { MenuSlice, menuFetching, menuFetchingSuccess } from '@/store/reducers/MenuReducer';


const Home = () =>
{
  const pageTitle = "Home Page";

  const links = useAppSelector(state => state.MenuSlice.links);
  console.log(links);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <TopBar>
      </TopBar>
      <main>
        <h1>{pageTitle}</h1>
      </main>
    </>
  )
};

export default Home;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async () =>
  {
    store.dispatch(menuFetching());
    const links = await fetchMenuItems('358');
    store.dispatch(menuFetchingSuccess(links));
  }
);
