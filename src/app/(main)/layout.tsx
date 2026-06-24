import Navbar from "@/modules/layout/header/views/Navbar";
import Footer from "@/modules/layout/footer/views/Footer";
import AIChatModal from "@/components/AiChatModal";
import { GetSiteSetting } from "@/core/services/api/Get/GetSiteSetting";
import Maintenance from "@/modules/panels/admin/components/setting/Maintenance";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <>
      <Navbar />
      <div className="pt-[82px]">{children}</div>
      <AIChatModal />
      <Footer />
    </>
  );
}
