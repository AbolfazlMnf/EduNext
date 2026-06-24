import { metadataGenerator } from "@/Utils/helper/metadata";

export async function generateMetadata() {
  return metadataGenerator({ title: "EduNext | Auth" });
}
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#eeee] dark:bg-[#1e1e1e]">{children}</div>
  );
}
