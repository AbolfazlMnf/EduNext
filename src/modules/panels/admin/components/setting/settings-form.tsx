"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Globe, ShieldAlert, Save, RotateCcw, Loader2 } from "lucide-react";

import {
  UpdateSiteSetting,
  UpdateSiteSettingPayload,
} from "@/core/services/api/put/UpdateSiteSetting";
import { toast } from "sonner";

interface SettingsFormProps {
  initialData: {
    siteTitle: string;
    isMaintenanceMode: boolean;
  };
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter();
  const [isPendingRefresh, startTransition] = useTransition();

  const [siteTitle, setSiteTitle] = useState(initialData.siteTitle);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(
    initialData.isMaintenanceMode,
  );

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: (payload: UpdateSiteSettingPayload) =>
      UpdateSiteSetting(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Settings updated successfully");
      startTransition(() => {
        router.refresh();
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      siteTitle: initialData.siteTitle,
      isMaintenanceMode: initialData.isMaintenanceMode,
    },
    validationSchema: Yup.object({
      siteTitle: Yup.string()
        .min(3, "Site title must be at least 3 characters.")
        .required("Site title is required."),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const handleCancel = () => {
    formik.resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ siteTitle, isMaintenanceMode });
  };

  const isLoading = isMutating || isPendingRefresh;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 "
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Platform Settings
        </h2>
        <p className="text-sm text-slate-500 dark:text-[#ccc]">
          Manage core configurations and system status for EduNext Academy.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <Card className="rounded-3xl py-10 border-white/70 bg-white/80 shadow-md backdrop-blur dark:bg-[#333] dark:border-[#444] overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-violet-600" />
              General Configuration
            </CardTitle>
            <CardDescription className="text-xs text-slate-400 dark:text-[#898989]">
              Modify global properties that apply to the entire website
              interface.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="siteTitle"
                className="text-sm font-medium text-slate-700 dark:text-[#ccc]"
              >
                Site Title
              </Label>
              <Input
                id="siteTitle"
                name="siteTitle"
                type="text"
                placeholder="Enter website title..."
                value={formik.values.siteTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`h-12 rounded-2xl border-slate-200 focus-visible:ring-1 focus-visible:ring-violet-600 dark:bg-[#252525] dark:border-[#444] text-sm font-medium ${
                  formik.touched.siteTitle && formik.errors.siteTitle
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              {formik.touched.siteTitle && formik.errors.siteTitle && (
                <p className="text-xs text-red-500 mt-1 pl-1">
                  {formik.errors.siteTitle}
                </p>
              )}
            </div>

            <hr className="border-slate-100 dark:border-[#444]/60" />

            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700 dark:text-[#ccc]">
                Platform Status
              </Label>

              <div
                className={`flex items-center justify-between rounded-2xl border p-4 transition-all duration-300 ${
                  isMaintenanceMode
                    ? "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10"
                    : "border-slate-200 bg-slate-50/50 dark:border-[#444] dark:bg-[#454545]/30"
                }`}
              >
                <div className="flex gap-3 items-start pl-2">
                  <div
                    className={`p-2 rounded-xl mt-0.5 ${
                      isMaintenanceMode
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-slate-200/60 text-slate-500 dark:bg-[#333]"
                    }`}
                  >
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-900 dark:text-white">
                      Maintenance Mode
                    </div>
                    <div className="text-xs text-slate-500 dark:text-[#b1b1b1] mt-0.5 leading-relaxed max-w-md">
                      When activated, the public website is locked. Visitors
                      will see a maintenance screen, while admins can still
                      access the dashboard.
                    </div>
                  </div>
                </div>

                <Switch
                  checked={formik.values.isMaintenanceMode}
                  onCheckedChange={(checked) =>
                    formik.setFieldValue("isMaintenanceMode", checked)
                  }
                  className="data-[state=checked]:bg-amber-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 mt-7 mb-5">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="rounded-2xl dark:text-white border-slate-200 dark:border-[#444] hover:bg-slate-50 dark:hover:bg-[#454545]/50 px-5 transition-all"
          >
            <RotateCcw className="mr-1.5 h-4 w-4 opacity-70" />
            Cancel Changes
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            className="rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 shadow-md shadow-violet-600/10 transition-all flex items-center min-w-[140px] justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className=" h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-1.5 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
