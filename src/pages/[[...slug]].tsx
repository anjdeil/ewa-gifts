import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { customRestApi } from "@/services/CustomRestApi";
import { pageSchema } from "@/types/Services/customApi";
import { z } from "zod";
import { FC } from "react";
// import { PageBuilder } from "@/components/PageBuilder";
import { AxiosResponse } from "axios";
// import { PageHeader } from "@/components/Layouts/PageHeader";

const PagePropsSchema = z.object({
  page: pageSchema,
  isMain: z.boolean(),
  error: z.string()
})

type PageProps = z.infer<typeof PagePropsSchema>;

const Page: FC<PageProps> = ({ page, error, isMain }) =>
{
  if (error || !page) throw new Error(error);
  console.log(isMain);

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* {!isMain && <PageHeader title={page.title} breadLinks={[{ name: page.title, url: `/${page.title}` }]} />} */}
        {/* <PageBuilder sections={page.sections} /> */}
      </main>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function getServerSideProps(context: GetServerSidePropsContext)
{
  const { params } = context;
  const isMain = Object.keys(params ?? {}).length === 0;
  let slug = "homepage";

  if (params && Array.isArray(params.slug) && params.slug.length > 0)
    slug = params.slug[0];

  try
  {
    const { data } = await customRestApi.get(`pages/${slug}`) as AxiosResponse;

    if (data && data.data && data.data.item) return { props: { page: data.data.item, isMain: isMain } };
    else return { notFound: true };

  }
  catch (err)
  {
    return { props: { error: 'Server Error.' } }
  }
}

export default Page;
