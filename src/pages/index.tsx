import CategoryBars from "@/components/Common/CategoryBars/CategoryBars";
import wpRestApi from "@/services/wordpress/WPRestAPI";
import Head from "next/head";

const Home = ({ response }) => {
  const pageTitle = "Home Page";
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <main
        style={{ padding: 30 }}>
        <h1>{pageTitle}</h1>
        <CategoryBars />
      </main >
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export async function getServerSideProps() {
  let response;
  try {
    response = await wpRestApi.get('pages', { slug: `homepage` });
    response = response.data;
  } catch (error) {
    response = (error as Error).message;
  }

  return {
    props: {
      response,
    },
  };
}

export default Home;