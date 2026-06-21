import api from "@/core/services/api";
import { AxiosError } from "axios";
import { SiteSettingData } from "../Get/GetSiteSetting";

export interface UpdateSiteSettingPayload {
  siteTitle: string;
  isMaintenanceMode: boolean;
}

export interface UpdateSiteSettingResponse {
  success: boolean;
  message: string;
  data: SiteSettingData;
}

interface BackendErrorResponse {
  message: string;
}

export async function UpdateSiteSetting(
  payload: UpdateSiteSettingPayload,
): Promise<UpdateSiteSettingResponse> {
  try {
    const response = await api.put<UpdateSiteSettingResponse>(
      "/admin-panel/settings",
      payload,
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<BackendErrorResponse>;
    const errorMessage =
      axiosError.response?.data?.message || "Something went wrong";
    throw new Error(errorMessage);
  }
}
