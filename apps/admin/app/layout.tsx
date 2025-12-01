import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard - Project Zucchini",
  description: "With ❤️ by DSC NIT Rourkela",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
