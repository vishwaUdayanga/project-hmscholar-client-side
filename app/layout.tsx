import type { Metadata } from "next";
import "./globals.css";
//Importing the custom font created in ui/fonts.ts
import { poppins } from "@/app/ui/fonts";


export const metadata: Metadata = {
  title: "IHMA",
  description: "The official website of the International Hotel Management Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
