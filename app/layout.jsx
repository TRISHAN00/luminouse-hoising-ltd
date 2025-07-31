"use client";

import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
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
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [settingsData, setSettingsData] = useState(null);
  const [isNewsDetail, setIsNewsDetail] = useState(false);
  const [isLivousDenim, setIsLivousDenim] = useState(false);
  const [isLuminouseArch, setIsLuminouseArch] = useState(false);

  // Simulate router events using pathname (since next/navigation doesn't expose router.events)
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // simulate loading time
    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/get-req-data/settings-data`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        setSettingsData(data);
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    }

    fetchSettings();
  }, []);

  useEffect(() => {
    setIsNewsDetail(pathname.startsWith("/news/"));
    setIsLivousDenim(pathname.startsWith("/livous-denim"));
    setIsLuminouseArch(pathname.startsWith("/luminouse-architecture"));
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
          <GlobalStyle />
          <ToastContainer />
          {loading && <LoadingSpinner />}
          <Header
            isLivousDenim={isLivousDenim}
            isLuminouseArch={isLuminouseArch}
            isNewsDetail={isNewsDetail}
            settingsData={settingsData}
          />
          {children}
          <Footer
            isLivousDenim={isLivousDenim}
            isLuminouseArch={isLuminouseArch}
            isNewsDetail={isNewsDetail}
            settingsData={settingsData}
          />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
