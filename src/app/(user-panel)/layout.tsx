import DashboardContainer from "@/components/container/DashboardContainer";
import HorizantalNavView from "@/modules/user-panel/view/HorizantalNavView";
import VerticalNavView from "@/modules/user-panel/view/VerticalNavView";
import React from "react";

function UserPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardContainer>
      <div className=" flex flex-col w-full h-screen gap-5">
        <div>
          <HorizantalNavView />
        </div>

        <div className="lg:px-15 flex items-start justify-between h-full ">
          <div className="w-[19%] h-[99%]">
            <VerticalNavView />
          </div>
          <div className="w-[77%] h-[99%]">{children}</div>
        </div>
      </div>
    </DashboardContainer>
  );
}

export default UserPanelLayout;
