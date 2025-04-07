import { testFlag } from "@/flags";

const Page = async () => {
  const x = await testFlag();
  console.log(x);
  return <div>TestFlag::{x.toString()}</div>;
};

export default Page;
