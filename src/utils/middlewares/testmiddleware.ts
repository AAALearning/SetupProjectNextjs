import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default function withTestMiddleware(
  next: (request: NextRequest, event: NextFetchEvent) => NextResponse
): (request: NextRequest, event: NextFetchEvent) => NextResponse {
  return (request: NextRequest, event: NextFetchEvent) => {
    console.log("Start test middleware");
    const response = next(request, event);
    console.log("End test middleware");
    return response;
  };
}
