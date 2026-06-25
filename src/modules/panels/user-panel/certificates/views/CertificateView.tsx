import { Award, FileCheck, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { apiFetch } from "@/core/Fetch";
import { ICertificateResponse } from "../types";
import { CertificateCard } from "../components/CertificateCard";
import CoursesPagination from "@/modules/main/Courses/components/main/Pagination";
import TopFilters from "@/components/Filters/TopFilters";

export default async function CertificateView({
  params,
}: {
  params: Record<string, string>;
}) {
  const res = await apiFetch<ICertificateResponse>("/user-panel/certificates", {
    params,
  });
  let certificates = null;
  if ("data" in res) {
    certificates = res.data;
  }
  const totalCertificates = certificates?.length || 0;
  const courseCertificates =
    certificates?.filter((c) => c.course !== null).length || 0;
  const generalCertificates = totalCertificates - courseCertificates;

  const stats = [
    {
      label: "Total Certificates",
      value: totalCertificates,
      icon: Award,
      color: "from-[#C8853F] to-[#A86B2C]",
      bg: "bg-[#F0E3D0]",
    },
    {
      label: "Course Certificates",
      value: courseCertificates,
      icon: GraduationCap,
      color: "from-[#C8853F] to-[#A86B2C]",
      bg: "bg-[#FBF7EF]",
    },
    {
      label: "General Certificates",
      value: generalCertificates,
      icon: FileCheck,
      color: "from-[#A86B2C] to-[#8B5A24]",
      bg: "bg-[#F6F1E8]",
    },
  ];

  return (
    <div className="space-y-8   min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br bg-primary/50 flex items-center justify-center shadow-md">
              <Award className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h1
              className="text-4xl font-bold text-foreground"
              style={{ fontFamily: "DM Serif Display, serif" }}
            >
              My <span className="italic text-primary">Certificates</span>
            </h1>
          </div>
          <p className="text-[#8A8A80] font-medium ml-16">
            Your collection of earned certificates and achievements
          </p>
        </div>
      </div>
      <div>
        <TopFilters />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className={`border-[#E2D9C8] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#8A8A80] mb-2 uppercase tracking-wide">
                      {stat.label}
                    </p>
                    <p
                      className="text-4xl font-bold text-foreground"
                      style={{ fontFamily: "DM Serif Display, serif" }}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-16 h-16 rounded-xl bg-primary flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {certificates?.length === 0 && (
        <Card>
          <div className="py-16 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[#F0E3D0] flex items-center justify-center">
              <Award className="w-12 h-12 text-[#C8853F]" strokeWidth={2} />
            </div>
            <h3
              className="text-2xl font-bold text-foreground mb-3"
              style={{ fontFamily: "DM Serif Display, serif" }}
            >
              No certificates <span className="italic text-[#C8853F]">yet</span>
            </h3>
            <p className="text-[#8A8A80] font-medium max-w-md mx-auto">
              Complete courses and pass exams to earn your certificates
            </p>
          </div>
        </Card>
      )}

      {certificates && certificates?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <CertificateCard key={certificate._id} certificate={certificate} />
          ))}
        </div>
      )}
      <div>
        <CoursesPagination
          totalPages={
            "meta" in res ? Math.ceil(res.meta.total / res.meta.limit) : 1
          }
        />
      </div>
    </div>
  );
}
