import { SettingsForm } from "@/modules/panels/admin/components/setting/settings-form";
import { GetSiteSetting } from "@/core/services/api/Get/GetSiteSetting";

export default async function Page() {
  const response = await GetSiteSetting();

  const defaultSettings = {
    siteTitle: "EduNext",
    isMaintenanceMode: false,
  };

  const initialData = response?.data
    ? {
        siteTitle: response.data.siteTitle,
        isMaintenanceMode: response.data.isMaintenanceMode,
      }
    : defaultSettings;

  return <SettingsForm initialData={initialData} />;
}
