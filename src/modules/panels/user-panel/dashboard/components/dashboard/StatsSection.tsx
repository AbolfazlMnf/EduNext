import { BookOpen, CheckCircle2, Award, DollarSignIcon } from "lucide-react";
import StatCard from "./StatCard";
import { IUserStats } from "./DashboardContent";

export default function StatsSection({ stats }: { stats: IUserStats | null }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <StatCard
        title="Active Courses"
        value={stats?.data?.activeCoursesCount || 0}
        icon={<CheckCircle2 className="w-5 h-5" />}
      />
      <StatCard
        title="Purchased Courses"
        value={stats?.data.purchasedCoursesCount ?? 0}
        icon={<DollarSignIcon className="w-5 h-5 text-green-500" />}
      />
      <StatCard
        title="Certificates"
        value={stats?.data?.certificatesCount ?? 0}
        icon={<Award className="w-5 h-5 text-yellow-500" />}
      />
    </div>
  );
}
