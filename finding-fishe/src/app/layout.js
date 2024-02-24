
import React from "react";
import { Inter } from "next/font/google";
import Head from 'next/head'; // Import Head from next/head
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html>
      <Head>
        <title>Finding FishE</title>
        <meta name="description" content="Protecting small businesses from tax fraud" />
      </Head>
      <body>
        <div className={inter.className}>
            {children}
        </div>
      </body>
    </html>
  );
}
