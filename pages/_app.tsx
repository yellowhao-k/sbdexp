// pages/_app.tsx

import type { AppProps } from 'next/app';
import Script from 'next/script'; // 导入 next/script 组件
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      
      {/* 1. Statcounter 脚本 - 使用 next/script 进行性能优化 */}
      
      {/* Script 1: 定义变量。使用 strategy="afterInteractive" (页面加载后闲置时加载) */}
      <Script id="statcounter-vars" strategy="afterInteractive">
        {`
          var sc_project=13185543; 
          var sc_invisible=1; 
          var sc_security="3f5dec63"; 
        `}
      </Script>
      
      {/* Script 2: 加载计数器代码。 */}
      <Script
        id="statcounter-load"
        strategy="afterInteractive" 
        src="https://www.statcounter.com/counter/counter.js"
      />
      
      {/* 2. noscript 部分 - 放在 App 组件的末尾 */}
      <noscript>
        <div className="statcounter">
          <a title="Web Analytics" href="https://statcounter.com/" target="_blank">
            <img
              className="statcounter"
              src="https://c.statcounter.com/13185543/0/3f5dec63/1/"
              alt="Web Analytics"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </a>
        </div>
      </noscript>

    </>
  );
}