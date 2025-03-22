import { sleep } from "@/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, segmentData: { params: Promise<{ slug: string }> }) {
  const params = await segmentData.params;
  const searchParams = request.nextUrl.searchParams;
  await sleep(2000);
  return Response.json({
    name: `${searchParams.get("name") ?? ""} ${Math.random()}`,
  });
}
