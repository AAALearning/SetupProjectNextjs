import ChangeUrl from "@/components/test/ChangeUrl";
import DBTest from "@/components/test/DBTest";
import DynamicTest from "@/components/test/DynamicTest";
import ShowSearchParams from "@/components/test/ShowSearchParams";
import ViewTransitionTest from "@/components/test/ViewTransitionTest";
import { sleep } from "@/utils";
import { Suspense } from "react";

const Test = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const { test } = await searchParams;
  await sleep(3000);
  return (
    <div>
      <Suspense fallback={<p>Loading dynamic test...</p>}>
        <DynamicTest />
      </Suspense>
      <hr />
      <ViewTransitionTest />
      <hr />
      <Suspense fallback={<>...Loading</>}>
        <DBTest />
      </Suspense>
      <hr />
      <ChangeUrl />
      <hr />
      {test ? test : "no search params"}
      <ShowSearchParams />
      <hr />
    </div>
  );
};

export default Test;
