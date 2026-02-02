import CourseCard from "../../views/CourseCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function MainCourses() {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="w-full flex lg:flex-row lg:flex-wrap flex-col gap-4 justify-between">
        {Array.from({ length: 12 }, (_, i) => (
          <CourseCard classNames="w-full lg:w-[32%]" key={i} />
        ))}
      </div>
      <div className="pt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default MainCourses;
