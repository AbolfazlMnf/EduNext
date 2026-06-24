import React from "react";
import Navbar from "../components/navbar";
import { cookies } from "next/headers";
import { apiFetch } from "@/core/Fetch";
export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}

export interface IUser {
  profileImage: string | null;
  profileImagePublicId: string | null;
  _id: string;
  email: string;
  role: UserRole[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  about: string;
  birthday: string | null;
  gender: Gender;
  phoneNumber: string;
  name: string;
  purchasedCourses: string[];
  courseProgress: ICourseProgress[];
}

export type UserRole = "admin" | "teacher" | "user";

export type Gender = "male" | "female" | "other";

export interface ICourseProgress {
  course: string;
  watchedSeconds: number;
  totalSeconds: number;
  isCompleted: boolean;
  _id: string;
}

const NavbarView = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  let user;
  if (token) {
    const res = await apiFetch<IUserResponse>("/user-panel/profile");
    if ("data" in res) {
      user = res.data.user;
    }
  }

  return (
    <div>
      <Navbar user={user} />
    </div>
  );
};

export default NavbarView;
