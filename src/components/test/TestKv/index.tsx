"use client";
import { setKv } from "@/actions/test/kv";

const TestKv = () => {
  return (
    <div>
      <button onClick={() => setKv()}>TestKV</button>
    </div>
  );
};

export default TestKv;
