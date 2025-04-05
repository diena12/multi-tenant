import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // 認証不要のパス
  const publicPaths = ["/admin/login", "/admin/register", "/admin/pre-verify"];

  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // 認証が必要なパス
  const protectedPaths = [
    "/admin/dashboard",
    "/admin/articles",
    "/admin/settings",
    "/admin/profile",
  ];

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // 認証が必要なページにアクセスしようとしている場合
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // 認証済みユーザーが認証不要ページにアクセスしようとしている場合
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 認証が必要なパス
    "/admin/dashboard/:path*",
    "/admin/articles/:path*",
    "/admin/settings/:path*",
    "/admin/profile/:path*",
    // 認証不要のパス
    "/admin/login",
    "/admin/register",
    "/admin/pre-verify",
  ],
};
