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
      <div className="flex flex-col  h-screen overflow-hidden">
        <div className="shrink-0">
          <HorizantalNavView />
        </div>

        <div className="flex flex-1 overflow-hidden lg:px-15 py-4">
          <div className="hidden lg:block lg:w-[20%] h-full">
            <VerticalNavView />
          </div>

          <div className="px-5 w-full lg:w-[80%] h-full overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

export default UserPanelLayout;
