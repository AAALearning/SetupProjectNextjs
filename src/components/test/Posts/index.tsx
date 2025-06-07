// app/posts/posts.tsx
"use client";

import { sleep } from "@/utils";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import Test from "./Test";

export default function Posts() {
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  // const { data } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: async () => {
  //     await sleep(100000);
  //     return { post: 1 };
  //   }
  // });

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix.
  const { data: commentsData } = useQuery({
    queryKey: ["posts-comments"],
    queryFn: async () => {
      await sleep(2000);
      return { comments: 2 };
    },
  });

  return (
    <>
      <div>{commentsData?.comments}</div>
      <Suspense fallback={"...loading"}>
        <Test />
      </Suspense>
    </>
  );
}
