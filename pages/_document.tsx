// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* 如果你也有 PNG 或 SVG，可以继续加 */}
        { <link rel="icon" type="image/png" href="/images/favicon.png" /> }
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
