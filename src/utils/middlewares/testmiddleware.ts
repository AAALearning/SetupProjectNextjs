import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default function withTestMiddleware(
  next: (request: NextRequest, event: NextFetchEvent) => Promise<NextResponse>
): (request: NextRequest, event: NextFetchEvent) => Promise<NextResponse> {
  return async (request: NextRequest, event: NextFetchEvent) => {
    console.log("Start test middleware");
    const response = await next(request, event);
    console.log("End test middleware");
    return response;
  };
}
