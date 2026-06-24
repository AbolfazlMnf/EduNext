import { ArrowRight, BookOpen } from "lucide-react";
import { ICourseData } from "@/core/services/api/Get/GetAllCourses";
import Link from "next/link";
import { MyCourseCard } from "../../../UserCourses/components/UserCourseCard";
import { IEnrolledCourse } from "../../../UserCourses/types";

export default function CoursesSection({
  courses,
}: {
  courses: IEnrolledCourse[] | null;
}) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-semibold">Continue Learning</h2>
        <Link
          className="text-foreground flex items-center gap-3"
          href={"/panels/user/user-courses"}
        >
          View All <ArrowRight />
        </Link>
      </div>

      <div>
        {courses?.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/40" />
            <p className="mt-4 text-lg font-semibold">No courses yet</p>
            <p className="text-sm text-muted-foreground">
              Enroll in a course to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses?.slice(0, 2).map((item) => (
              <MyCourseCard key={item.course._id} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
