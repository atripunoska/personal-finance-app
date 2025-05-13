import type { Metadata } from "next";
import "./globals.css";
import { Public_Sans } from "next/font/google";
import { WebVitals } from "@/app/ui/WebVitals";

const publicSans = Public_Sans({ subsets: ["latin"], display: "optional" });

export const metadata: Metadata = {
  title: "Personal Finance App",
  description: "A personal finance app built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.className} antialiased bg-beige-100`}>
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
