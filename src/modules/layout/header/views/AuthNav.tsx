"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/useThemes/useThemes";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { IUser } from "./Navbar";
import { UserMenu } from "./User";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

function AuthNav({ user }: { user?: IUser }) {
  const { toggleTheme } = useTheme();
  const router = useRouter();
  return (
    <div className=" flex flex-col gap-3 lg:gap-0 lg:flex-row lg:items-center  ">
      {user ? (
        <UserMenu
          onLogout={() => {
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            router.refresh();
          }}
          user={user}
        />
      ) : (
        <div>
          <Link href="/login">
            <Button
              variant="secondary"
              className="shadow-md cursor-pointer py-1 px-5 rounded-md "
            >
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-[#3d1dbf] cursor-pointer shadow-md text-white py-1 px-5 rounded-md ">
              Register
            </Button>
          </Link>
        </div>
      )}

      <div
        onClick={toggleTheme}
        className="rounded-full  items-center justify-center cursor-pointer ml-5 hidden lg:flex"
      >
        <Sun
          size={35}
          className="text-orange-400 hidden dark:block transition-colors"
        />
        <Moon
          size={35}
          className="text-slate-700 block dark:hidden transition-colors hover:text-[#644DB3] transition-all duration-100"
        />
      </div>
    </div>
  );
}

export default AuthNav;
