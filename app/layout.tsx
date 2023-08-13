"use client";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";
import fetcher from "./libs/fetcher";
import Navbar from "./components/navbar";
import { AuthProvider } from "./context/authProvider";
import Footer from "./components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Health Record</title>
        <meta name="description" content="Website rekam data pasien" />
      </head>
      <SWRConfig
        value={{
          fetcher: fetcher,
          revalidateOnFocus: false,
          refreshInterval: 2500,
        }}
      >
        <body
          className="pattern-dots pattern-blue-500 pattern-bg-white 
  pattern-size-6 pattern-opacity-20"
        >
          <AuthProvider>
            <Toaster />
            <Navbar />
            {children}
          </AuthProvider>
          <Footer />
        </body>
      </SWRConfig>
    </html>
  );
}
