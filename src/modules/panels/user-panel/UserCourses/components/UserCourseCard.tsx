// components/dashboard/MyCourseCard.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Lock,
  Play,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { IEnrolledCourse } from "../types";

interface Props {
  data: IEnrolledCourse;
}

function formatSeconds(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function MyCourseCard({ data }: Props) {
  const { course, teacher, progress, examStatus, certificate } = data;

  const progressPercent = Math.round(progress.percent);
  const isCompleted = progress.isCompleted;

  const getStage = () => {
    if (certificate.issued) return "certified";
    if (examStatus.taken) return "exam-done";
    if (isCompleted) return "completed";
    if (progressPercent > 0) return "in-progress";
    return "not-started";
  };

  const stage = getStage();

  const stageConfig = {
    "not-started": {
      label: "Not Started",
      color: "bg-muted text-muted-foreground",
      dot: "bg-gray-400",
    },
    "in-progress": {
      label: "In Progress",
      color: "bg-blue-500/10 text-blue-500",
      dot: "bg-blue-500 animate-pulse",
    },
    completed: {
      label: "Completed",
      color: "bg-green-500/10 text-green-600",
      dot: "bg-green-500",
    },
    "exam-done": {
      label: "Exam Taken",
      color: "bg-purple-500/10 text-purple-600",
      dot: "bg-purple-500",
    },
    certified: {
      label: "Certified",
      color: "bg-amber-500/10 text-amber-600",
      dot: "bg-amber-500",
    },
  };

  const config = stageConfig[stage];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={course.courseImage ?? "/images/NoImage.png"}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70
         via-black/20 to-transparent"
        />

        <div className="absolute top-3 left-3">
          <span
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${config.color} border border-current/20`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
            {config.label}
          </span>
        </div>

        <div
          className="absolute top-3 right-3 flex items-center gap-1 rounded-full
         bg-black/40 backdrop-blur-sm px-2.5 py-1"
        >
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-white">
            {course.rating.toFixed(1)}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-primary transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {course.categories.map((cat) => (
            <Badge
              key={cat._id}
              variant="secondary"
              className="rounded-full px-2.5 py-0.5 text-xs"
            >
              {cat.name}
            </Badge>
          ))}
          <Badge
            variant="outline"
            className="rounded-full px-2.5 py-0.5 text-xs"
          >
            {course.courseLevel.name}
          </Badge>
        </div>

        <h3 className="line-clamp-2 text-sm font-bold leading-snug">
          {course.title}
        </h3>

        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={teacher?.profileImage ?? undefined}
              alt={teacher?.name}
            />
            <AvatarFallback className="text-[10px]">
              {teacher?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{teacher?.name}</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-primary">
              {progressPercent}%
            </span>
          </div>
          <Progress value={progressPercent} className="h-2 rounded-full" />
          {progress.totalSeconds > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>
                {formatSeconds(progress.watchedSeconds)} /{" "}
                {formatSeconds(progress.totalSeconds)}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-3">
          <MilestoneItem
            icon={<BookOpen className="h-3.5 w-3.5" />}
            label="Course"
            done={isCompleted}
          />
          <div className="h-px flex-1 bg-border" />
          <MilestoneItem
            icon={<FileText className="h-3.5 w-3.5" />}
            label="Exam"
            done={examStatus.taken}
            locked={!isCompleted}
          />
          <div className="h-px flex-1 bg-border" />
          <MilestoneItem
            icon={<Award className="h-3.5 w-3.5" />}
            label="Cert"
            done={certificate.issued}
            locked={!examStatus.taken}
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(course.updatedAt), {
              addSuffix: true,
            })}
          </span>
          <Button
            asChild
            size="sm"
            className="h-8 rounded-full gap-1 px-4 text-xs"
          >
            <Link href={`/courses/${course._id}`}>
              {stage === "not-started" ? "Start" : "Continue"}
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

interface MilestoneProps {
  icon: React.ReactNode;
  label: string;
  done: boolean;
  locked?: boolean;
}

function MilestoneItem({ icon, label, done, locked }: MilestoneProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
          done
            ? "bg-primary text-white"
            : locked
              ? "bg-muted text-muted-foreground/40"
              : "bg-muted text-muted-foreground"
        }`}
      >
        {done ? (
          <CheckCircle2 className="h-3.5 w-3.5" />
        ) : locked ? (
          <Lock className="h-3 w-3" />
        ) : (
          icon
        )}
      </div>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}
