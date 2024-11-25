import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Organic Oasis",
  description:
    "Organic Oasis is a e-commerce platform for all kinds of organic food.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en" data-theme="lemonade">
        <body className={cn(rubik.className, "antialiased")}>
          <div className="min-h-screen">
            <Toaster
              position="bottom-right"
              reverseOrder={false}
              toastOptions={{ duration: 5000 }}
            />
            <Navbar />
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
