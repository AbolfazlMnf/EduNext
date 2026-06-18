"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  DollarSign,
  GraduationCap,
  Search,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AdminSignup, AdminTransaction } from "../data/mock";
import type { AdminReportData } from "@/core/services/api/Get/GetAdminReports";
import type { CoursesPageData } from "@/core/services/api/Get/GetAllCoursesAdmin";
import type { AdminCategory } from "@/core/services/api/Get/GetAllCategoryAdmin";
import type { AdminLevel } from "@/core/services/api/Get/GetAllLevelsAdmin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PaginationComp } from "@/components/PaginationComp";
import { AllPaymentModal } from "./sales-reports/modals/allPaymentModal";
import { useState, useCallback, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Lottie from "lottie-react";
import Empty from "@/assets/Lottie/Empty.json";
import Image from "next/image";

type Props = {
  mockData: {
    signups: AdminSignup[];
    transactions: AdminTransaction[];
  };
  reports: AdminReportData;
  coursesData: CoursesPageData;
  categories: AdminCategory[];
  levels: AdminLevel[];
};

const formatDelta = (diff: number, prefix: string = "") => {
  const sign = diff >= 0 ? "+" : "";
  return `${sign}${prefix}${diff.toLocaleString()} this month`;
};

function StatIcon({ type }: { type: "students" | "courses" | "sales" }) {
  const base = "h-5 w-5";
  if (type === "students") return <GraduationCap className={base} />;
  if (type === "courses") return <BookOpen className={base} />;
  return <ShieldCheck className={base} />;
}

export function AdminDashboard({
  reports,
  coursesData,
  categories,
  levels,
}: Props) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all" && value !== "all-levels") {
        params.set(name, value);
        params.set("page", "1");
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  const handleSearch = (term: string) => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      router.push(`${pathname}?${createQueryString("search", term)}`, {
        scroll: false,
      });
    }, 500);
  };

  const handleFilterChange = (key: string, value: string) => {
    router.push(`${pathname}?${createQueryString(key, value)}`, {
      scroll: false,
    });
  };

  const statsList = [
    {
      title: "Total Students",
      value: reports.totalStudents.total.toLocaleString(),
      deltaText: formatDelta(reports.totalStudents.growth.difference),
      percentage: reports.totalStudents.growth.percentage,
      icon: "students" as const,
      accent: "violet" as const,
    },
    {
      title: "Total Courses",
      value: reports.totalCourses.total.toLocaleString(),
      deltaText: formatDelta(reports.totalCourses.growth.difference),
      percentage: reports.totalCourses.growth.percentage,
      icon: "courses" as const,
      accent: "indigo" as const,
    },
    {
      title: "Total Sales",
      value: `$${reports.totalSales.total.toLocaleString()}`,
      deltaText: formatDelta(reports.totalSales.growth.difference, "$"),
      percentage: reports.totalSales.growth.percentage,
      icon: "sales" as const,
      accent: "emerald" as const,
    },
  ];

  return (
    <div className="space-y-6 ">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 ">
        {statsList.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.12 }}
          >
            <Card className="rounded-3xl border-white/70 bg-white/80 shadow-sm backdrop-blur dark:bg-[#333]">
              <CardContent className="flex items-start justify-between p-6">
                <div>
                  <div className="text-sm text-slate-500 dark:text-[#ccc]">
                    {item.title}
                  </div>
                  <div className="mt-2 text-3xl font-semibold tracking-tight">
                    {item.value}
                  </div>

                  <div className="mt-2 flex flex-col gap-2 text-sm font-medium">
                    <span
                      className={cn(
                        "flex items-center",
                        item.percentage >= 0
                          ? "text-emerald-600"
                          : "text-red-500",
                      )}
                    >
                      {item.percentage >= 0 ? "+" : "-"}
                      {Math.abs(item.percentage)}%
                    </span>
                    <span className="text-slate-500 font-normal dark:text-[#ccc]">
                      {item.deltaText}
                    </span>
                  </div>
                </div>
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl",
                    item.accent === "violet" && "bg-violet-100 text-violet-700",
                    item.accent === "indigo" && "bg-indigo-100 text-indigo-700",
                    item.accent === "emerald" &&
                      "bg-emerald-100 text-emerald-700",
                  )}
                >
                  <StatIcon type={item.icon} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="2xl:grid gap-6 2xl:grid-cols-12 ">
        <Card className="xl:col-span-8 mb-5 2xl:mb-0 rounded-3xl border-white/70 bg-white/80 shadow-sm backdrop-blur dark:bg-[#333]">
          <CardHeader className="flex flex-col gap-4 py-7 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl text-center md:text-start w-full">
              Course Management
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="px-6 pb-4">
              <div className="mt-5 flex flex-col gap-4 md:gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full lg:w-[40%] mb-2 lg:mb-0">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    className="rounded-2xl py-5 pl-10"
                    placeholder="Search courses..."
                    defaultValue={searchParams.get("search")?.toString() || ""}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                <div className="flex flex-row items-center justify-between lg:justify-start gap-1 sm:gap-9 lg:gap-4 mb-2 sm:mb-5 lg:mb-0">
                  <div className="w-full lg:w-full">
                    <Select
                      defaultValue={
                        searchParams.get("categories")?.toString() || "all"
                      }
                      onValueChange={(val) =>
                        handleFilterChange("categories", val)
                      }
                    >
                      <SelectTrigger className="w-full rounded-2xl py-5">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full lg:w-full">
                    <Select
                      defaultValue={
                        searchParams.get("courseLevel")?.toString() ||
                        "all-levels"
                      }
                      onValueChange={(val) =>
                        handleFilterChange("courseLevel", val)
                      }
                    >
                      <SelectTrigger className="w-full rounded-2xl py-5">
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-levels">All Levels</SelectItem>
                        {levels.map((lvl) => (
                          <SelectItem key={lvl.id} value={lvl.id}>
                            {lvl.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full text-left text-sm">
                <thead className="border-y border-slate-200/80 bg-slate-50/70 text-slate-500 dark:bg-[#454545]">
                  <tr>
                    <th className="w-[350px] px-10 py-4 font-medium dark:text-[#ccc]">
                      Course
                    </th>

                    <th className="px-6 py-4 font-medium dark:text-[#ccc]">
                      Teacher
                    </th>

                    <th className="px-6 py-4 font-medium dark:text-[#ccc]">
                      Category
                    </th>

                    <th className="px-6 py-4 font-medium dark:text-[#ccc]">
                      Price
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {coursesData.courses.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="pt-10 pb-10 text-slate-500 dark:text-[#aaa]"
                      >
                        <div className="flex flex-col items-center justify-center gap-10">
                          <Lottie
                            style={{ width: 200, height: 200 }}
                            animationData={Empty}
                          />
                          <p>No courses found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    coursesData.courses.map((course) => (
                      <tr
                        key={course.id}
                        className="border-b border-slate-100 dark:border-[#444]"
                      >
                        <td className="px-6 py-4 flex items-center gap-3">
                          {course.image ? (
                            <Link href={`/coursedetail/${course.id}`}>
                              <Image
                                src={course.image}
                                alt={course.title}
                                width={112}
                                height={64}
                                className="h-16 w-28 rounded-xl object-cover shrink-0 dark:bg-[#ccc] transition-all duration-300  hover:shadow-lg"
                              />
                            </Link>
                          ) : (
                            <div className="h-16 w-28 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 shrink-0" />
                          )}
                          <Link
                            href={`/coursedetail/${course.id}`}
                            className="font-semibold text-slate-900 dark:text-white line-clamp-2 hover:!text-violet-400 transition-colors"
                          >
                            {course.title}
                          </Link>
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-700 dark:text-[#ccc]">
                            {course.instructor}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-slate-700 dark:text-[#ccc]">
                          {course.category}
                        </td>

                        <td className="px-6 py-4">
                          <Badge
                            className="
                              rounded-full
                              bg-violet-100
                              text-violet-700
                              px-3.5
                              py-1
                              font-semibold
                              shadow-sm
                              dark:bg-violet-500/15
                              dark:text-violet-300
                            "
                          >
                            ${course.price}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 px-6 pb-4 md:hidden">
              {coursesData.courses.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-10 pt-10 pb-20 text-slate-500 dark:text-[#aaa]">
                  <Lottie
                    style={{ width: 200, height: 200 }}
                    animationData={Empty}
                  />
                  <p>No courses found</p>
                </div>
              ) : (
                coursesData.courses.map((course) => (
                  <div
                    key={course.id}
                    className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-[#444] dark:bg-[#3a3a3a]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex w-full gap-3">
                        {course.image ? (
                          <Link href={`/coursedetail/${course.id}`}>
                            <Image
                              src={course.image ?? "/images/people.png"}
                              alt={course.title}
                              width={112}
                              height={64}
                              className="h-16 w-28 rounded-xl object-cover shrink-0 dark:bg-[#ccc]"
                            />
                          </Link>
                        ) : (
                          <div className="h-16 w-24 shrink-0 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300" />
                        )}

                        <div className="flex-1">
                          <Link
                            href={`/coursedetail/${course.id}`}
                            className="line-clamp-2 font-semibold text-slate-900 dark:text-white w-20 sm:w-auto"
                          >
                            {course.title}
                          </Link>
                          <p className="mt-1 text-xs text-slate-500 dark:text-[#898989]">
                            {course.category}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-sm text-[black] dark:text-[white]">
                          Teacher : {course.instructor}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          className="
                              rounded-full
                              bg-violet-100
                              text-violet-700
                              px-3.5
                              py-1
                              font-semibold
                              shadow-sm
                              dark:bg-violet-500/15
                              dark:text-violet-300
                            "
                        >
                          ${course.price}
                        </Badge>

                        <Badge variant="secondary" className="rounded-full">
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {coursesData.meta.pages > 1 && (
              <PaginationComp
                currentPage={coursesData.meta.page}
                totalPages={coursesData.meta.pages}
              />
            )}
          </CardContent>
        </Card>

        <div className="xl:col-span-4 space-y-6 ">
          <Card className="rounded-3xl border-white/70 bg-white/80 shadow-sm backdrop-blur dark:bg-[#333] py-5">
            <CardHeader className="flex-row items-center justify-center">
              <CardTitle className="text-xl text-center mb-3">
                Recent Signups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link
                href="/admin/user-management"
                className=" w-full text-center rounded-2xl border-1 border-[black] dark:border-[#898989] p-2 
                 hover:bg-[black] hover:text-[white] dark:hover:bg-[white] dark:hover:text-[black] transition-all duration-200"
              >
                View All
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-white/70 bg-white/80 shadow-sm backdrop-blur dark:bg-[#333] py-5">
            <CardHeader className="flex flex-row items-center justify-between pb-5">
              <CardTitle className="text-xl dark:text-[white]">
                Sales Overview
              </CardTitle>
              <div className="text-xs text-slate-500 dark:text-[#898989]">
                Last 30 Days
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <div className="text-3xl font-semibold tracking-tight dark:text-[white]">
                    $25,300
                  </div>
                  <div className="text-sm text-slate-500 dark:text-[#898989]">
                    Transactions
                  </div>
                </div>
                <div className="text-right text-sm text-emerald-600">
                  <div>+15.7%</div>
                  <div>+10.2%</div>
                </div>
              </div>

              <div className="h-40 rounded-3xl bg-gradient-to-b from-violet-50 to-white p-4 ">
                <svg viewBox="0 0 320 140" className="h-full w-full">
                  <defs>
                    <linearGradient id="salesFill" x1="0" x2="0" y1="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#8b5cf6"
                        stopOpacity="0.35"
                      />
                      <stop
                        offset="100%"
                        stopColor="#8b5cf6"
                        stopOpacity="0.02"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,110 C20,112 35,104 50,100 C65,96 80,88 95,90 C110,92 125,84 140,78 C155,72 170,76 185,68 C200,60 215,56 230,58 C245,60 260,50 275,44 C290,38 305,40 320,36 L320,140 L0,140 Z"
                    fill="url(#salesFill)"
                  />
                  <path
                    d="M0,110 C20,112 35,104 50,100 C65,96 80,88 95,90 C110,92 125,84 140,78 C155,72 170,76 185,68 C200,60 215,56 230,58 C245,60 260,50 275,44 C290,38 305,40 320,36"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-white/70 bg-white/80 shadow-sm backdrop-blur dark:bg-[#333] py-5">
            <CardHeader className="flex items-center justify-center">
              <CardTitle className="text-xl dark:text-[white] pb-5">
                Latest Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* {data.transactions.slice(0, 3).map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium dark:text-[white]">
                      {item.amount}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-[#898989]">
                      {item.title}
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <div className="dark:text-[#898989]">{item.time}</div>
                    <div className="dark:text-[#898989]">{item.meta}</div>
                  </div>
                </div>
              ))} */}
            </CardContent>
            <div className="flex items-center justify-center">
              <Button
                onClick={() => setIsPaymentModalOpen(true)}
                variant="outline"
                className="w-[90%] flex items-center justify-center mt-4  mx-auto cursor-pointer rounded-2xl border-violet-600 text-violet-600 hover:text-violet-600 hover:bg-violet-50 dark:border-violet-500 dark:text-violet-400 dark:hover:bg-violet-500/10"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                View All Payments
              </Button>
            </div>
          </Card>
        </div>
      </section>
      <AllPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </div>
  );
}
