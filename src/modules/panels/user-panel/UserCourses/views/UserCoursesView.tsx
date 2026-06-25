import { apiFetch } from "@/core/Fetch";
import { BookOpen, GraduationCap, Trophy } from "lucide-react";
import { IMyCoursesResponse } from "../types";
import { MyCourseCard } from "../components/UserCourseCard";
import CoursesPagination from "@/modules/main/Courses/components/main/Pagination";
import TopFilters from "@/components/Filters/TopFilters";

export default async function UserCoursesView({
  params,
}: {
  params: Record<string, string>;
}) {
  const res = await apiFetch<IMyCoursesResponse>("/user-panel/my-courses", {
    params,
  });
  let data = null;
  if ("data" in res) {
    data = res.data;
  }
  console.log(res);

  const completedCount = data?.filter((d) => d.progress.isCompleted).length;
  const certCount = data?.filter((d) => d.certificate.issued).length;
  const inProgressCount = data?.filter(
    (d) => d.progress.percent > 0 && !d.progress.isCompleted,
  ).length;

  return (
    <div>
      <div className="space-y-8 p-6">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="mt-1 text-muted-foreground">
            Track your learning journey
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <StatCard
            icon={<BookOpen className="h-5 w-5 text-blue-500" />}
            label="In Progress"
            value={inProgressCount ?? 0}
            bg="bg-blue-500/10"
          />
          <StatCard
            icon={<GraduationCap className="h-5 w-5 text-green-500" />}
            label="Completed"
            value={completedCount ?? 0}
            bg="bg-green-500/10"
          />
          <StatCard
            icon={<Trophy className="h-5 w-5 text-amber-500" />}
            label="Certificates"
            value={certCount ?? 0}
            bg="bg-amber-500/10"
          />
        </div>
        <div>
          <TopFilters />
        </div>

        {data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/40" />
            <p className="mt-4 text-lg font-semibold">No courses yet</p>
            <p className="text-sm text-muted-foreground">
              Enroll in a course to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {data?.map((item) => (
              <MyCourseCard key={item.course._id} data={item} />
            ))}
          </div>
        )}
      </div>
      <div className="mt-1">
        <CoursesPagination
          totalPages={
            "data" in res ? Math.ceil(res.meta.total / res.meta.limit) : 1
          }
        />
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  bg: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
      <div className={`rounded-xl p-2.5 ${bg}`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
