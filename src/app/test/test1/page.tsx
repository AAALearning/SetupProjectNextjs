import ChangeUrl from "@/components/test/ChangeUrl";
import DBTest from "@/components/test/DBTest";
import DetailContent from "@/components/test/DetailContent";
import DynamicTest from "@/components/test/DynamicTest";
import ShowSearchParams from "@/components/test/ShowSearchParams";
import TestForm from "@/components/test/TestForm";
import ViewTransitionTest from "@/components/test/ViewTransitionTest";
import { sleep } from "@/utils";
import Link from "next/link";
import { after } from "next/server";
import { Suspense } from "react";

const Test = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const { test } = await searchParams;
  after(() => {
    console.log("Log in after(), you go into test/test1");
  });
  await sleep(1000);
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
      <DetailContent />
      <hr />
      <TestForm />
      <hr />
      <Link href="/home">Go to home</Link>
    </div>
  );
};

export default Test;
