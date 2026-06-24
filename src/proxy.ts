import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "./Utils/helper/token";

export default async function proxy(req: NextRequest) {
  const protectedRoutes = ["/panels"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  let accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (isProtectedRoute && !refreshToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const isNeedRefresh =
    refreshToken && (!accessToken || isTokenExpired(accessToken));

  const response = NextResponse.next();

  if (isNeedRefresh) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
        {
          method: "POST",
          body: JSON.stringify({ refreshToken }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");

        if (isProtectedRoute) {
          return NextResponse.redirect(new URL("/auth/login", req.url));
        }
        return response;
      }

      const data = await res.json();
      accessToken = data.data.accessToken;
      if (accessToken) {
        response.cookies.set("accessToken", accessToken);
      }
    } catch (error) {
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      if (isProtectedRoute) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
