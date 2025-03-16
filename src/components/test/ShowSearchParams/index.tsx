"use client";

import { usePathname, useSearchParams, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";

// Dùng search params
const ShowSearchParams = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  return (
    <>
      <div>{searchParams.get("test")}</div>
      <div>{pathName}</div>
    </>
  );
};

export default ShowSearchParams;
