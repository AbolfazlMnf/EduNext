import { apiFetch } from "@/core/Fetch";
import { GetAllCourses } from "@/core/services/api/Get/GetAllCourses";
import { MetadataRoute } from "next";

export const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/teachers`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  const courses = await GetAllCourses();
  if (courses.data.length > 0) {
    courses.data.map((item, i) => {
      routes.push({
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${item._id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 1,
      });
    });
  }

  return routes;
};
