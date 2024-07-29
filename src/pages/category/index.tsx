import Head from "next/head";
import { useRouter } from "next/router";

const Catalog = () => {
  const router = useRouter();
  const { slug } = router.query;

  const pageTitle = "Main Catalog";
  const pageDescription = "This is the main catalog page";
  console.log('Catalog');

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <p>{pageTitle}</p>
          {slug && <p>Slug: {slug}</p>}
          <div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Catalog;
