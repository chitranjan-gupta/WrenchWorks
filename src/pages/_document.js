import { Html, Head, Main, NextScript } from "next/document";
import * as gtm from "@/lib/gtm";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtm.GTM_TRACKING_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
