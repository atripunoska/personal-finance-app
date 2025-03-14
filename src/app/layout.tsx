import type { Metadata } from "next";
import "./globals.css";
import { Public_Sans } from "next/font/google";
import User from "./ui/user/LoggedUser";

const publicSans = Public_Sans({ subsets: ["latin"] });

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
        {children}
      </body>
    </html>
  );
}
