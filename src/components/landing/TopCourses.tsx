import React from "react";
import Container from "../container/Container";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CourseCard from "../CourseCard/CourseCard";

function TopCourses() {
  const Courses: string[] = ["", "", ""];
  return (
    <Container>
      <div className="w-full min-h-[500px]  ">
        <div className="w-full h-[20%] flex justify-between items-center border-b border-gray-600 pb-1 ">
          <h1 className="text-[26px] font-bold">Featured Courses </h1>
          <div className="flex gap-2 items-center">
            <Link className="text-gray-600 cursor-pointer" href="/courses">
              View All Courses
            </Link>
            <ChevronRight className="w-5 h-6 text-gray-600" />
          </div>
        </div>
        <div className="h-[80%] w-full flex md:flex-row flex-col gap-6 md:gap-0 justify-between mt-7 ">
          {Courses.map((_, index) => (
            <CourseCard key={index} />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default TopCourses;
