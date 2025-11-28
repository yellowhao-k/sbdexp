// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* PNG / SVG */}
        <link rel="icon" type="image/png" href="/images/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
