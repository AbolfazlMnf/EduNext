import { BaseUrl } from "@/Utils/URL";

export interface IUserInfo {
  success: true;
  user: IUser;
}

export interface IUser {
  profileImage: string | null;
  profileImagePublicId: string;
  purchasedCourses: string[];
  _id: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  about: string;
  birthday: string;
  gender: string;
  phoneNumber: string;
  name: string;
  passwordResetExpires: string;
  passwordResetToken: string;
}

export const getUserInfo = async (): Promise<IUser | null> => {
  try {
    const res = await fetch(`${BaseUrl}/auth/profile`, { cache: "no-store" });
    if (!res.ok) return null;
    const result = await res.json();
    return result.user ?? null;
  } catch (err) {
    console.log("fetch failed", err);
    return null;
  }
};
