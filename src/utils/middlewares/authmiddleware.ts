import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "../auth";

const privateRoutes = ["/auth/private"];
const adminRoutes = ["/auth/admin"];

export default function withAuthMiddleware(
  next: (request: NextRequest, event: NextFetchEvent) => Promise<NextResponse>
): (request: NextRequest, event: NextFetchEvent) => Promise<NextResponse> {
  return async (request: NextRequest, event: NextFetchEvent) => {
    if (privateRoutes.includes(request.nextUrl.pathname)) {
      const user = await getUserFromSession(request.cookies);
      if (user == null) {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
      }
    }
    if (adminRoutes.includes(request.nextUrl.pathname)) {
      const user = await getUserFromSession(request.cookies);
      if (user == null) {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
      }
      if (user.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    const response = await next(request, event);
    return response;
  };
}
