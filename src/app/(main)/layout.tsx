import Navbar from "@/modules/layout/header/views/Navbar";
import Footer from "@/modules/layout/footer/views/Footer";
import AIChatModal from "@/components/AiChatModal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="pt-[82px]">{children}</div>
      <AIChatModal />
      <Footer />
    </>
  );
}
