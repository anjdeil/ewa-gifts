import Head from "next/head";
import { useRouter } from "next/router";

const Catalog = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log('no catalog');

  const pageDescription = "This is the main catalog page";

  return (
    <>
      <Head>
        <title>{slug}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          {slug && <p>Slug: {slug}</p>}
          <div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Catalog;
