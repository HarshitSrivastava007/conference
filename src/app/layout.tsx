import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import ClientProvider from "./clientProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meetings app",
  description: "A video calling app built with Next.js & Stream",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ClientProvider>
            <Navbar />
            {/* <ThemeProvider> */}
            <main className="relative mt-14 flex flex-col justify-center overflow-hidden">
              {children}
            </main>
            {/* </ThemeProvider> */}
          </ClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
