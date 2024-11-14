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

  /** Get seo data for the current category */
  const { title, description, open_graph, twitter, bot } = page.seo_data || {};
  // Open graph
  const { title: graphTitle, description: graphDesc, image: graphImage, image_meta: graphImageMeta } = open_graph || {};
  const { width, height } = graphImageMeta || {};
  // Twitter
  const { title: twitTitle, description: twitDesc, image: twitImage } = twitter || {};

  return (
    <>
      <Head>
        {/* Standard Meta Tags */}
        <title>{title || ""}</title>
        <meta name="description" content={description || page.title} />
        {bot?.is_no_index && <meta name="robots" content="noindex" />}
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        {graphTitle && <meta property="og:title" content={graphTitle} />}
        {graphDesc && <meta property="og:description" content={graphDesc} />}
        {graphImage && <meta property="og:image" content={graphImage} />}
        {width && <meta property="og:image:width" content={width.toString()} />}
        {height && <meta property="og:image:height" content={height.toString()} />}
        {/* Optional Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        {twitTitle && <meta name="twitter:title" content={twitTitle} />}
        {twitDesc && <meta name="twitter:description" content={twitDesc} />}
        {twitImage && <meta name="twitter:image" content={twitImage} />}
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
