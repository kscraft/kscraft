import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kiran Slido Craft | Sound Proof Windows & Automation",
  description: "Specializing in soundproof windows, partitions, and motorized automation systems since 1985.",
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
