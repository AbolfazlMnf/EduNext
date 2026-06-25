"use client";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UpdateUserInfo } from "@/core/services/api/put/UpdateUserInfo";
import { IUser } from "@/modules/layout/header/views/Navbar";
import { formatDateEN } from "@/Utils/helper/DateConverter";
import {
  BookOpen,
  Calendar,
  CalendarIcon,
  Mail,
  Phone,
  Save,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const UserInfoForm = ({ userInfo }: { userInfo: IUser | null }) => {
  const router = useRouter();

  const [state, action, isPending] = useActionState<
    {
      data: IUser | null;
      message: string | null;
      hasError: boolean;
    },
    FormData
  >(UpdateUserInfo, { data: userInfo ?? null, message: null, hasError: false });
  const { data, message, hasError } = state;
  const [date, setDate] = useState<Date | undefined>(
    data?.birthday ? new Date(data?.birthday) : undefined,
  );
  useEffect(() => {
    if (!message) return;

    if (hasError) {
      toast.error(message);
    } else {
      toast.success(message);
      router.refresh();
    }
  }, [message, hasError]);
  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm font-medium flex items-center gap-2"
          >
            <User className="w-4 h-4 text-gray-400" />
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue={data?.name || ""}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-gray-400" />
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={data?.email || ""}
            placeholder="Enter your email"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="phoneNumber"
            className="text-sm font-medium flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-gray-400" />
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            defaultValue={data?.phoneNumber || ""}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            Birthday
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start px-3 font-normal
                 "
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                {date ? formatDateEN(date.toISOString()) : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
              />
            </PopoverContent>
          </Popover>
          <Input
            type="hidden"
            name="birthday"
            value={date ? date.toISOString() : ""}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            Gender
          </Label>

          <Select name="gender" defaultValue={data?.gender ?? undefined}>
            <SelectTrigger>
              <SelectValue placeholder="Select a gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">male</SelectItem>
                <SelectItem value="female">female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="about"
          className="text-sm font-medium flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-gray-400" />
          About Me
        </Label>
        <Textarea
          id="about"
          name="about"
          defaultValue={data?.about || ""}
          placeholder="Tell us about yourself..."
          rows={4}
        />
      </div>
      <div className="w-full flex justify-center">
        <Button
          type="submit"
          disabled={isPending}
          className=" bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
         text-white "
        >
          <Save className="w-4 h-4 mr-2" />
          {isPending ? "Saving...." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default UserInfoForm;
