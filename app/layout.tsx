import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";
import { AuthProvider } from "./context/authProvider";
import { SWRProvider } from "./context/swrProvider";
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
      <SWRProvider>
        <body className="w-full flex flex-col items-center justify-center">
          <AuthProvider>
            <Toaster />
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </body>
      </SWRProvider>
    </html>
  );
}
