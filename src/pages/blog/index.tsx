// import wpRestApi from "@/services/wordpress/WPRestAPI";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import Head from "next/head";

const Blog = ({ response }) => {
  const pageTitle = "Blog";
  console.log(response);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <main>
        <h1>{pageTitle}</h1>
        <p>Welcome to the Blog Page</p>
      </main>
    </>
  );
};

export default Blog;

// response = await wpRestApi.get('posts');