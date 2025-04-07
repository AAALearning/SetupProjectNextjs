import { flag } from "@vercel/flags/next";

export const testFlag = flag<boolean>({
  key: "testflags",
  description: "This is test flag description",
  identify: () => {
    return { userId: "test" };
  },
  decide: async ({ entities }) => {
    console.log("Flag::", entities);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/flag.json`);
    const data = await response.json();
    return data.testFlag;
  },
  defaultValue: false, // decide return undefined sẽ lấy defaultValue
});
