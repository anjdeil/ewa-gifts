// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import TestSlice from "@/store/reducers/TestSlice";
import Head from "next/head";

const Home = () => {
  const pageTitle = "Home Page";

  // const dispatch = useAppDispatch();
  // const {} = useAppSelector(state => state.)
  // const {users, isLoading, error} = useSelector(state => state.TestSlice);


  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <main>
        <h1>{pageTitle}</h1>
        <p>Welcome to the Home Page</p>
      </main>
    </>
  );
};

export default Home;
