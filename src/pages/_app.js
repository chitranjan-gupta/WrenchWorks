import "@/styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import * as gtag from "../../lib/gtag";

const App = ({ Component, pageProps }) => {
  const router = useRouter()
   useEffect(() => {
     const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
     router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
   }, [router.events])

  return (
    <>
      <Head>
        <title>WrenchWorks</title>
        <meta
          name="description"
          content="WrenchWorks.tech provides information about car, car parts, car servicing."
        />
        <link rel="icon" type="image/x-icon" href="favicon.ico"/>
        <link rel="manifest" href="site.webmanifest"/>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        />
      </Head>
      <Script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
          id='gtag'
        />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4551487873622800"
     crossOrigin="anonymous" id='gadsense'/>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        id='gtagafter'
      />
      <Component {...pageProps} />
    </>
  );
};

export default App;
