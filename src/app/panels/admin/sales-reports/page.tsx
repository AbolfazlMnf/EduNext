export const revalidate = 120;

import { SalesReports } from "@/modules/panels/admin/components/sales-reports/sales-reports";
import { getSalesData } from "@/modules/panels/admin/data/mock";

export default async function Page() {
  const data = await getSalesData();
  return (
    <SalesReports
      summary={data.summary}
      series={data.series}
      transactions={data.transactions}
    />
  );
}
