import CertificateView from "@/modules/panels/user-panel/certificates/views/CertificateView";

const CertificatePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const sparams = await searchParams;
  const params = {
    search: sparams?.search ?? "",
    page: sparams.page ?? "1",
    limit: sparams.limit ?? "9",
    sort: sparams.sort ?? "",
  };
  return (
    <>
      <CertificateView params={params} />
    </>
  );
};

export default CertificatePage;
