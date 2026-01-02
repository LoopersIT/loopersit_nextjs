import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LoopersIT - Web Development & Digital Solutions",
  description: "We create responsive, custom websites and implement digital marketing strategies to drive business growth online.",
  metadataBase: new URL('https://loopersit.com'),
  openGraph: {
    title: "LoopersIT - Web Development & Digital Solutions",
    description: "We create responsive, custom websites and implement digital marketing strategies to drive business growth online.",
    url: 'https://loopersit.com',
    siteName: 'LoopersIT',
    images: [
      {
        url: '/loopersit_logo_1.png',
        width: 512,
        height: 512,
        alt: 'LoopersIT Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "LoopersIT - Web Development & Digital Solutions",
    description: "We create responsive, custom websites and implement digital marketing strategies to drive business growth online.",
    images: ['/loopersit_logo_1.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader color="#23ADAD" showSpinner={false} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
