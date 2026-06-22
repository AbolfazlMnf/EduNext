import { Home } from "lucide-react";
import ToggleThem from "../../../../../Utils/helper/ToggleThem";
import MobileNavPanel from "./MobileNavPanel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { IUser } from "@/modules/layout/header/views/Navbar";

const HorizontalNav = async ({ user }: { user: IUser | null }) => {
  return (
    <>
      <div
        className="lg:flex items-center justify-between w-full 
       shadow dark:shadow-lg  lg:px-15 py-5 hidden "
      >
        <div className="flex items-center gap-3">
          <ToggleThem />
          <Link href={"/"}>
            <Home className="text-foreground" size={30} />
          </Link>
        </div>

        <div className="flex items-center gap-4 ">
          <h2 className="text-[21px] font-medium  ">
            {user?.name || "no Name"}
          </h2>
          <Avatar className="w-10 h-10 border-2 border-primary ">
            <AvatarImage src={user?.profileImage ?? undefined} />
            <AvatarFallback className="bg-primary-10 text-primary">
              {user?.name?.charAt(0).toUpperCase() || "no name"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="lg:hidden">
        <MobileNavPanel
          name={user?.name || "no Name"}
          image={user?.profileImage || "/images/NoImage.png"}
        />
      </div>
    </>
  );
};

export default HorizontalNav;
