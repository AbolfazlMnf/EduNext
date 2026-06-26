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

  let response = NextResponse.next();
  const requestHeaders = new Headers(req.headers);

  if (isNeedRefresh) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `refreshToken=${refreshToken}`,
          },
        },
      );

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          response.cookies.delete("accessToken");
          response.cookies.delete("refreshToken");
          if (isProtectedRoute) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
          }
        }
        return response;
      }

      const data = await res.json();
      accessToken = data.accessToken;

      if (accessToken) {
        requestHeaders.set("Authorization", `Bearer ${accessToken}`);

        response = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });

        response.cookies.set("accessToken", accessToken, {
          path: "/",
          maxAge: 15 * 60,
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
      }
    } catch (error) {
      console.error("Failed to refresh token in middleware:", error);
    }
  } else if (accessToken) {
    requestHeaders.set("Authorization", `Bearer ${accessToken}`);
    response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
