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
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
