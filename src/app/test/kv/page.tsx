import TestKv from "@/components/test/TestKv";
import { kv } from "@vercel/kv";

const Page = async () => {
  const testData = await kv.get("test");
  return (
    <>
      Hello
      {testData ?? "No data"}
      <TestKv />
    </>
  );
};

export default Page;
