// app/posts/posts.tsx
"use client";

import { sleep } from "@/utils";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function Test() {
  const { data: dataSuspense } = useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      await sleep(100000); // Thời gian client và server khác nhau thì cái nào xong trước sẽ lấy cái đó
      return { post: 1 };
    },
  });

  return (
    <>
      <div>{dataSuspense?.post}</div>
    </>
  );
}
