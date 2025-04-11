// components/Layout.js
"use client";

import { useEffect, useState } from "react";
import Preloader from "./Preloader";

export default function Layout({ children }) {
  const [showPreloader, setShowPreloader] = useState(true);
  
  useEffect(() => {
    // You can control when to remove the preloader component entirely from DOM
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 6000); // Time after fade animation completes
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {showPreloader && <Preloader />}
      {children}
    </>
  );
}