import Layout from "@/components/layout/Layout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wigs by Jade - Premium Hair Products",
  description: "High-quality wigs, hair extensions, and hair pieces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-50 text-gray-800`}
        suppressHydrationWarning={true}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
