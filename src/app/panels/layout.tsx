import { metadataGenerator } from "@/Utils/helper/metadata";

export async function generateMetadata() {
  return metadataGenerator({ title: "EduNext | Panel" });
}
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
