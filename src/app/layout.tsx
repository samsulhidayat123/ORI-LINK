import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ORI-LINK",
  description: "Official Links for PROJECT.BY.SOEL",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // Tambahkan suppressHydrationWarning juga di body untuk menangani atribut suntikan ekstensi
        suppressHydrationWarning={true}
        className={`${inter.className} antialiased bg-black text-white selection:bg-purple-500/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
};