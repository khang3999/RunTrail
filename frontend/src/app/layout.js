"use client";
import "./globals.css";
import Providers from "@/contexts/Providers";

// link fontawesome
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Header from "@/components/Header";
// import { Metadata } from 'next';
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AppProvider from "@/contexts/AppProvider";
import Footer from "@/components/Footer";

config.autoAddCss = false;

export const metadatasite = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>
          <AppProvider>
            <Header />
            {children}
            <ToastContainer />
            <Footer />
          </AppProvider>
        </Providers>
      </body>
    </html>
  );
}