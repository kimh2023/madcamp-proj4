import "@/styles/globals.css";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import locale from "antd/locale/ko_KR";
import "dayjs/locale/ko";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type AppPropsWithLayout = AppProps & {
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ConfigProvider theme={theme} locale={locale}>
      {getLayout(<Component {...pageProps} />)}
    </ConfigProvider>
  );
}
