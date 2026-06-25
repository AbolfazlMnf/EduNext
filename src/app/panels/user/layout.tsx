import DashboardContainer from "@/components/container/DashboardContainer";
import { GetSiteSetting } from "@/core/services/api/Get/GetSiteSetting";
import Maintenance from "@/modules/panels/admin/components/setting/Maintenance";
import HorizantalNavView from "@/modules/panels/user-panel/dashboard/view/HorizantalNavView";
import VerticalNavView from "@/modules/panels/user-panel/dashboard/view/VerticalNavView";

export default async function UserPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await GetSiteSetting();
  const isMaintenanceMode = response?.data?.isMaintenanceMode || false;

  if (isMaintenanceMode) {
    return (
      <main className="min-h-screen w-full flex flex-col bg-slate-50 dark:bg-[#121212]">
        <Maintenance />
      </main>
    );
  }

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
