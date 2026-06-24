import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/Utils/ReactQuery/QueryProvider";
import { ThemeProvider } from "@/components/useThemes/provider";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/components/authProvider/AuthProvider";
import { ScrollToTop } from "@/components/scrollToTop";
import { metadataGenerator } from "@/Utils/helper/metadata";
import { GetSiteSetting } from "@/core/services/api/Get/GetSiteSetting";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const response = await GetSiteSetting();

  const siteTitle = response?.data?.siteTitle || "EduNext Academy";

  return {
    title: {
      template: `%s | ${siteTitle}`,
      default: siteTitle,
    },
    description: "Learning Management System for EduNext",
  };
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
