import "@/styles/globals.css";
import { customTheme, darkTheme, lightTheme } from "@/themes";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Theme } from "@mui/material";
import type { AppContext, AppProps } from "next/app";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

interface Props extends AppProps {
  theme: string
}

export default function App({ Component, pageProps, theme }: Props) {
  // console.log({ theme });

  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light';

    const selectedTheme = cookieTheme === 'light' ?
      lightTheme : (cookieTheme === 'dark') ? darkTheme : customTheme;

    setCurrentTheme((prevTheme) => selectedTheme);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// App.getInitialProps = async (appContext: AppContext) => {
//   const { theme } = await (appContext.ctx.req)
//     ?
//     (appContext.ctx.req as any).cookies
//     :
//     { theme: 'light' };

//   const validThemes: string[] = ['light', 'dark', 'custom'];

//   // console.log(cookies);

//   return {
//     theme: validThemes.includes(theme) ? theme : 'dark'
//   }
// }