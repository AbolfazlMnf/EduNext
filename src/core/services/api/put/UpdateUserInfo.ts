"use server";
import { IUser, IUserResponse } from "@/modules/layout/header/views/Navbar";
import { BaseUrl } from "@/Utils/URL";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const UpdateUserInfo = async (
  prevData: { data: IUser | null; message: string | null; hasError: boolean },
  formData: FormData,
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value as string;

  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    about: formData.get("about"),
  };
  const res = await fetch(`${BaseUrl}/user-panel/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    return {
      data: prevData.data,
      message: "something went wrong !cant update",
      hasError: true,
    };
  }
  const result = (await res.json()) as IUserResponse;
  return {
    data: result.data.user,
    message: "updated successfully",
    hasError: false,
  };
};
