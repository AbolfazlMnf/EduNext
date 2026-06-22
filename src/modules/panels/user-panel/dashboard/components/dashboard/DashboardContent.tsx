import { apiFetch } from "@/core/Fetch";
import ActivitySection from "./ActivitySection";
import CoursesSection from "./CoursesSection";
import StatsSection from "./StatsSection";
import { IMyCoursesResponse } from "../../../UserCourses/types";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { CertificateCard } from "../../../certificates/components/CertificateCard";
import { ICertificateResponse } from "../../../certificates/types";

export interface IUserStats {
  success: boolean;
  data: {
    purchasedCoursesCount: number;
    activeCoursesCount: number;
    certificatesCount: number;
  };
}
export default async function DashboardContent() {
  const res = await apiFetch<IMyCoursesResponse>("/user-panel/my-courses", {
    next: { revalidate: 80 },
  });
  let data = null;
  if ("data" in res) {
    data = res.data;
  }
  const statsRes = await apiFetch<IUserStats>("/user-panel/reports", {
    params: {
      sort: "latest",
      limit: 2,
    },
    next: {
      revalidate: 80,
    },
  });

  let statsData = null;
  if ("data" in statsRes) {
    statsData = statsRes;
  }

  const certRes = await apiFetch<ICertificateResponse>(
    "/user-panel/certificates",
    {
      next: { revalidate: 80 },
    },
  );
  let certificates = null;
  if ("data" in certRes) {
    certificates = certRes.data;
  }
  console.log(certificates);

  return (
    <div className="flex flex-col gap-4">
      <StatsSection stats={statsData} />
      <CoursesSection courses={data} />
      <div className="mt-4 w-full">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-xl font-semibold">Certificates</h2>
          <Link
            className="text-foreground flex items-center gap-3"
            href={"/panels/user/user-courses"}
          >
            View All <ArrowRight />
          </Link>
        </div>

        <div>
          {certificates && certificates?.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center">
              <Award className="h-12 w-12 text-muted-foreground/40" />
              <p className="mt-4 text-lg font-semibold">No certificates yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certificates?.slice(0, 2).map((item) => (
                <CertificateCard key={item._id} certificate={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
