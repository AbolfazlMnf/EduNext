import { Metadata } from "next";

interface IProps {
  title?: string;
  description?: string;
  keywords?: string[];
}
export const metadataGenerator = ({
  title,
  description,
  keywords,
}: IProps = {}): Metadata => {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";

  const pageTitle = title ?? "EduNext";
  const pageDescription = description ?? "a online learning platform";
  return {
    metadataBase: new URL(SITE_URL),
    title: pageTitle,
    description: pageDescription,
    keywords: keywords ?? ["learning", "courses", "development", "programming"],
    openGraph: {
      type: "website",
      title: pageTitle,
      description: pageDescription,
      locale: "en",
      siteName: "EduNext",
      images: [
        {
          url: "/images/hero.PNG",
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: ["/images/hero.PNG"],
    },
  };
};
