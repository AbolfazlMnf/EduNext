"use client";

import { Card, CardContent } from "@/components/ui/card";
import CountUp from "react-countup";

interface Props {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export default function StatCard({ title, value, icon }: Props) {
  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="flex items-center justify-between px-4 py-4 ">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-xl">{icon}</div>
          <h3 className="text-2xl font-bold mt-1">
            <CountUp end={value} duration={6} />
          </h3>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
