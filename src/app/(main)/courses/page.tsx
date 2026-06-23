import Courses from "@/modules/main/Courses/views/Courses";
import { metadataGenerator } from "@/Utils/helper/metadata";

interface EventPageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
    limit?: string;
    courseLevel?: string;
    categories?: string;
    price?: string;
    sort?: string;
  }>;
}
export interface ICourseParams {
  search?: string;
  page?: string;
  limit?: string;
  courseLevel?: string;
  categories?: string;
  price?: string;
  sort?: string;
}
export async function generateMetadata() {
  return metadataGenerator({ title: "EduNext | Courses" });
}
export default async function CoursesPage({ searchParams }: EventPageProps) {
  const params: ICourseParams = await searchParams;

  return (
    <>
      <Courses params={params} />
    </>
  );
}
