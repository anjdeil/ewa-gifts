import Header from '@/components/Header/Header';
import Document, { Html, Head, Main, NextScript } from 'next/document';
export default class MyDocument extends Document
{
  render()
  {
    return (
      <Html lang="pl">
        <Head>
        </Head>
        <body>
          <Header></Header>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
