"use client";
import CountUp from "react-countup";
import { ILandingData } from "./HeroSections";

function HeroCount({ data }: { data: ILandingData | null }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-extrabold text-violet-600">
          <CountUp end={data?.totalStudents ?? 0} duration={3} />+
        </h2>

        <p className="mt-2 text-zinc-600 dark:text-zinc-400 font-medium">
          Students Enrolled
        </p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-extrabold text-violet-600">
          <CountUp end={data?.totalTeachers ?? 0} duration={3} />+
        </h2>

        <p className="mt-2 text-zinc-600 dark:text-zinc-400 font-medium">
          Expert Instructors
        </p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-extrabold text-violet-600">
          <CountUp end={data?.totalCourses ?? 0} duration={3} />+
        </h2>

        <p className="mt-2 text-zinc-600 dark:text-zinc-400 font-medium">
          Courses
        </p>
      </div>
    </div>
  );
}

export default HeroCount;
