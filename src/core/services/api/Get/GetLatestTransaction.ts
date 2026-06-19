import { cookies } from "next/headers";

interface ApiTransactionUser {
  _id: string;
  name: string;
  email: string;
}

interface ApiTransactionCourse {
  _id: string;
  title: string;
  courseImage: string | null;
  price: number;
}

interface ApiTransaction {
  _id: string;
  user: ApiTransactionUser;
  course: ApiTransactionCourse;
  amount: number;
  authority: string;
  refId: string;
  status: string;
  gateway: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiLatestTransactionsResponse {
  success: boolean;
  data: ApiTransaction[];
}

export interface AdminTransaction {
  id: string;
  title: string;
  amount: string;
  time: string;
  meta: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function getLatestTransactions(
  limit: number = 4,
): Promise<AdminTransaction[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${API_BASE}/payments/latest-transactions?limit=${limit}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );

  if (!res.ok) {
    throw new Error(
      `getLatestTransactions failed: ${res.status} ${res.statusText}`,
    );
  }

  const json: ApiLatestTransactionsResponse = await res.json();

  const rawData: ApiTransaction[] = Array.isArray(json) ? json : json.data;

  return rawData.map((item) => {
    const formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return {
      id: item._id,
      title: item.course?.title ?? "Unknown Course",
      amount: `$${item.amount.toLocaleString()}`,
      time: formattedDate,
      meta: item.user?.name ?? "Unknown User",
    };
  });
}
