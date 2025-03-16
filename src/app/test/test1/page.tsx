import ChangeUrl from "@/components/test/ChangeUrl";
import DBTest from "@/components/test/DBTest";
import DynamicTest from "@/components/test/DynamicTest";
import ShowSearchParams from "@/components/test/ShowSearchParams";
import ViewTransitionTest from "@/components/test/ViewTransitionTest";
import { Suspense } from "react";

const Test = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const { test } = await searchParams;
  return (
    <>
      <DynamicTest />
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
    </>
  );
};

export default Test;
