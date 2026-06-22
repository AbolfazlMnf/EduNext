import DashboardContainer from "@/components/container/DashboardContainer";
import HorizantalNavView from "@/modules/panels/user-panel/dashboard/view/HorizantalNavView";
import VerticalNavView from "@/modules/panels/user-panel/dashboard/view/VerticalNavView";

function UserPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardContainer>
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="shrink-0">
          <HorizantalNavView />
        </div>

        <div className="flex gap-6 flex-1 overflow-hidden lg:px-15 py-4">
          <div className="hidden lg:block lg:w-[20%] h-full">
            <VerticalNavView />
          </div>

          <div className=" px-5 md:px-0 w-full lg:w-[80%] h-full overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

export default UserPanelLayout;
