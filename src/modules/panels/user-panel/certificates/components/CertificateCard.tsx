"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Calendar, ExternalLink, Hash } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { ICertificate } from "../types";

interface CertificateCardProps {
  certificate: ICertificate;
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const issuedDate = new Date(certificate.issuedAt);
  const relativeTime = formatDistanceToNow(issuedDate, {
    addSuffix: true,
  });

  const handleView = () => {
    window.open(`/certificate?code=${certificate.code}`, "_blank");
  };

  return (
    <Card className="group relative overflow-hidden bg-background border-[#E2D9C8] hover:border-[#C8853F] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8853F]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#C8853F]/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#C8853F] to-[#A86B2C] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Award className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1F2421] group-hover:text-[#C8853F] transition-colors leading-tight">
                {certificate.course
                  ? certificate.course.title
                  : "General Certificate"}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <Hash className="w-3.5 h-3.5 text-[#8A8A80]" />
                <span className="text-xs font-mono text-[#8A8A80] tracking-tight">
                  {certificate.code}
                </span>
              </div>
            </div>
          </div>
          <Badge className="bg-[#F0E3D0] text-[#A86B2C] border-[#E2D9C8] hover:bg-[#F0E3D0] font-semibold">
            Verified
          </Badge>
        </div>

        {certificate.course?.courseImage && (
          <div className="relative w-full h-44 rounded-md overflow-hidden mb-5 border border-[#E2D9C8] shadow-sm">
            <Image
              src={certificate.course.courseImage}
              alt={certificate.course.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A2723]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        <div className="flex items-center gap-2.5 text-sm text-[#8A8A80] mb-5 bg-[#FBF7EF] -mx-6 px-6 py-3 border-y border-[#E2D9C8]">
          <Calendar className="w-4 h-4 text-[#C8853F]" />
          <span className="font-medium">Issued {relativeTime}</span>
          <span className="text-[#E2D9C8]">•</span>
          <span className="text-xs">
            {issuedDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleView}
            variant="outline"
            size="sm"
            className="flex-1 border-[#E2D9C8] text-[#1F2421]
             hover:border-[#333] hover:text-primary font-semibold transition-all"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Certificate
          </Button>
        </div>

        <div className="mt-5 pt-4 border-t border-[#E2D9C8]">
          <div className="flex items-center gap-2 text-xs text-[#8A8A80]">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-medium">Verifiable on platform</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
