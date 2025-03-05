import type { Metadata } from "next";
import "./globals.css";

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
      <body className={`font-public-sans antialiased bg-beige-100`}>
        {children}
      </body>
    </html>
  );
}
