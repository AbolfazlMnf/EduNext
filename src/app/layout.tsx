import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/Utils/ReactQuery/QueryProvider";
import { ThemeProvider } from "@/components/useThemes/provider";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/components/authProvider/AuthProvider";
import { ScrollToTop } from "@/components/scrollToTop";
import { metadataGenerator } from "@/Utils/helper/metadata";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export async function generateMetadata() {
  return metadataGenerator();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryProvider>
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
            <ScrollToTop />
            <Toaster position="top-center" />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
