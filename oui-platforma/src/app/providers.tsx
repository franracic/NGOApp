"use client";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

import { ChakraProvider } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { SWRConfig } from "swr";
import theme from "../styles/theme/theme";

const GA_TRACKING_ID = "G-N098BLLFT7";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.gtag && pathname) {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <SWRConfig>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </SWRConfig>
    </>
  );
}
