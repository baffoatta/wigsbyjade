import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApolloClientProvider from "@/components/ApolloProvider";

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
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        <ApolloClientProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
