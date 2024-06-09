import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <title>Film & TV Extractor</title>
      <Head>
        <script
          src={`${process.env.NEXT_PUBLIC_BACKEND}/reverse.js`}
          type="text/javascript"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
