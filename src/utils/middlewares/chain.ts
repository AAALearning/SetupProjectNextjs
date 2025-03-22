import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export type CustomMiddleware = (
  next: (request: NextRequest, event: NextFetchEvent) => NextResponse
) => (request: NextRequest, event: NextFetchEvent) => NextResponse;

function defaultMiddleware(request: NextRequest, event: NextFetchEvent) {
  return NextResponse.next();
}

export default function chain(
  middlewares: CustomMiddleware[]
): (request: NextRequest, event: NextFetchEvent) => NextResponse {
  let cachedFunc = defaultMiddleware;
  for (let i = middlewares.length - 1; i >= 0; i--) {
    cachedFunc = middlewares[i](cachedFunc);
  }
  return cachedFunc;
}
