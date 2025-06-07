import Posts from "@/components/test/Posts";
import { sleep } from "@/utils";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function PostsPage() {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      await sleep(10000);
      return { post: 1 };
    },
  });

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  );
}
