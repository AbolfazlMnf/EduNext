import Container from "@/components/container/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function CourseCard() {
  return (
    <Card className="md:w-[30%] h-[100%] mx-auto ">
      <div className="bg-black w-full aspect-video rounded-md" />
      <CardContent className=" mt-2 pb-1 ">
        <h2 className="text-[24px] font-bold ">Web Development Bootcamp</h2>
        <div className="flex gap-4 items-center">
          <h2 className="text-[18px] font-bold">24h 30m</h2>
          <span className="text-gray-700 text-l font-extrabold">.</span>
          <h3 className="text-sm text-gray-700">1,200 students</h3>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex justify-between items-center w-full border-t border-[#bbbb] py-3 ">
          <Button>Learn More</Button>
          <ChevronRight />
        </div>
      </CardFooter>
    </Card>
  );
}
