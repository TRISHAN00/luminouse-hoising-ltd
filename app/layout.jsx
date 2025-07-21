"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Menu";
import SmoothScroll from "@/components/SmoothScroll";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyle from "@/styles/globalStyle";
import "bootstrap/dist/css/bootstrap.min.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  const [isNewsDetail, setIsNewsDetail] = useState(false);
  const [isLivousDenim, setIsLivousDenim] = useState(false);
  const [isLuminouseArch, setIsLuminouseArch] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/news/")) {
      setIsNewsDetail(true);
    } else {
      setIsNewsDetail(false);
    }

    if (pathname.startsWith("/livous-denim")) {
      setIsLivousDenim(true);
    } else {
      setIsLivousDenim(false);
    }

    if (pathname.startsWith("/luminouse-architecture")) {
      setIsLuminouseArch(true);
    } else {
      setIsLuminouseArch(false);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/images/static/fav.png" />
        <meta content="#000000" name="theme-color" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <SmoothScroll />
          <div id="main-root">
            <GlobalStyle />
            <ToastContainer />
            <Header
              isLivousDenim={isLivousDenim}
              isLuminouseArch={isLuminouseArch}
              isNewsDetail={isNewsDetail}
            />
            {children}
            <Footer
              isLivousDenim={isLivousDenim}
              isLuminouseArch={isLuminouseArch}
              isNewsDetail={isNewsDetail}
            />
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
