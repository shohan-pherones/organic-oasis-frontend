import type { Metadata } from "next";
import "./globals.css";
import { Rubik } from "next/font/google";
import { cn } from "@/lib/utils";

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
    <html lang="en" data-theme="lemonade">
      <body className={cn(rubik.className, "antialiased")}>{children}</body>
    </html>
  );
}
