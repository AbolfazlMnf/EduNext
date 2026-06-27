import { apiFetch } from "@/core/Fetch";
import { IUser, IUserResponse } from "@/modules/layout/header/views/Navbar";
import { cookies } from "next/headers";

export const getUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  let user = null;

  try {
    if (token) {
      const res = await apiFetch<IUserResponse>("/user-panel/profile", {
        cache: "no-store",
      });
      if ("data" in res) {
        user = res?.data?.user as IUser;
      }
    }
    return user;
  } catch (err) {
    return null;
  }
};
