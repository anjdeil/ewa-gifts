import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { customRestApi } from "@/services/CustomRestApi";
import { FC } from "react";
import { PageBuilder } from "@/components/PageBuilder";
import { AxiosResponse } from "axios";
import { PageHeader } from "@/components/Layouts/PageHeader";
import { PageProps } from "@/types/Pages";
import { RichTextComponent } from "@/components/Common/RichTextComponent";
import { Section } from "@/components/Layouts/Section";
const Page: FC<PageProps> = ({ page, error, isMain }) =>
{
  if (error || !page) throw new Error(error);

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {!isMain && <PageHeader title={page.title} breadLinks={[{ name: page.title, url: `/${page.title}` }]} />}
        <PageBuilder sections={page.sections} />
        {page.content.length > 0 &&
          <Section className={"content-page"} isContainer={true}>
            <RichTextComponent text={page.content} />
          </Section>
        }
      </main>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function getServerSideProps(context: GetServerSidePropsContext)
{
  const { params } = context;
  let isMain = true;
  let slug = "homepage";

  if (params && params.slug && params.slug[0] !== "index")
  {
    slug = params.slug[0];
    isMain = false;
  }

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
