/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildQuery } from "@/Utils/helper/query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface IError {
  errorMessage: string;
  status: number;
}
type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  params?: Record<string, string | number | boolean | string[]>;
  body?: any;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function buildUrl(url: string, params?: FetchOptions["params"]) {
  if (!params) return url;
  const queries = buildQuery(params);
  return `${url}?${queries}`;
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T | IError> {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const url = buildUrl(`${API_URL}${endpoint}`, options.params);

    const headers = new Headers(options.headers);
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    let body = options.body;
    if (body) {
      if (body instanceof FormData) {
        headers.delete("Content-Type");
      } else if (
        typeof body === "object" &&
        !(body instanceof Blob) &&
        !(body instanceof ArrayBuffer)
      ) {
        body = JSON.stringify(body);
        if (!headers.has("Content-Type")) {
          headers.set("Content-Type", "application/json");
        }
      }
    }

    const requestInit: RequestInit = {
      method: options.method || "GET",
      headers,
      cache: options.cache,
      next: options.next,
      body: options.method === "GET" ? undefined : body,
    };

    console.log("Fetching URL:", url);

    const res = await fetch(url, requestInit);

    if (res.status === 401) {
      redirect("/login");
    }

    if (!res.ok) {
      const text = await res.text();

      return {
        errorMessage: text || "Server Error",
        status: res.status,
      };
    }

    if (res.status === 204) {
      return {} as T;
    }

    const contentType = res.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      return (await res.json()) as T;
    }

    return (await res.text()) as T;
  } catch (error: any) {
    if (
      error?.digest === "NEXT_REDIRECT" ||
      error?.message === "NEXT_REDIRECT"
    ) {
      throw error;
    }

    console.error("Fetch Wrapper Error:", error);
    return {
      errorMessage: error?.message || "server error",
      status: error?.status || 500,
    };
  }
}
