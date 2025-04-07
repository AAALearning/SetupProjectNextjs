"use server";

import { kv } from "@vercel/kv";

const setKv = () => {
  kv.set("test", "OK data now");
};

export { setKv };
