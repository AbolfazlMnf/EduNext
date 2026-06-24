import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ICourseData } from "@/core/services/api/Get/GetAllCourses";

export default function DashboardCourseCard({
  course,
}: {
  course: ICourseData;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition">
      <div className="relative h-50 w-full">
        <Image
          src={course.courseImage ?? "/images/NoImage.png"}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="p-5 space-y-4">
        <div>
          <h3 className="font-semibold">{course.title}</h3>
          <p className="text-sm text-muted-foreground">{course.teacherName}</p>
        </div>

        <Progress className="" value={44} />

        <Button className="w-full">
          Continue
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
