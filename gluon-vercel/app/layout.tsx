import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Content from "@/components/Content";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Gluon",
  description: "",
  icons: {
    icon: "./favicon.ico", // Add this
    shortcut: "./favicon.ico", // Add this
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${inter.variable} transition-all font-satoshi h-[100dvh] overflow-hidden text-[14px] border-dark-border text-black bg-white`}
      >
        <Content>{children}</Content>
        <Toaster theme={"dark"} />
      </body>
    </html>
  );
}
