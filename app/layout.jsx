"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Menu";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyle from "@/styles/globalStyle";
import "bootstrap/dist/css/bootstrap.min.css";
import { usePathname } from "next/navigation"; // ✅ use this instead of useRouter
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  const [isNewsDetail, setIsNewsDetail] = useState(false);
  const pathname = usePathname(); // ✅ reactive hook

  useEffect(() => {
    if (pathname.startsWith("/news/")) {
      setIsNewsDetail(true);
    } else {
      setIsNewsDetail(false);
    }
  }, [pathname]); // ✅ re-run this when path changes

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/images/static/fav.png" />
        <meta content="#000000" name="theme-color" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <div id="main-root">
            <GlobalStyle />
            <ToastContainer />
            <Header isNewsDetail={isNewsDetail} />
            {children}
            <Footer />
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
