import "@/styles/globals.css";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import locale from "antd/locale/ko_KR";
import "dayjs/locale/ko";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme} locale={locale}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
