import { cookies } from "next/headers";

export interface SiteSettingData {
  _id: string;
  siteTitle: string;
  isMaintenanceMode: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetSiteSettingResponse {
  success: boolean;
  data: SiteSettingData;
}

export async function GetSiteSetting(): Promise<GetSiteSettingResponse | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin-panel/settings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    return res.json();
  } catch (error) {
    console.error("GetSiteSetting Error:", error);
    return null;
  }
}
