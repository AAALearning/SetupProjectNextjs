"use client";

import { testDraftMode } from "@/actions/test/test";
import { useRouter } from "next/navigation";

const DraftModeTest = () => {
  const triggerDraftMode = async () => {
    await testDraftMode();
  };
  return (
    <>
      <button onClick={() => triggerDraftMode()}>DraftMode test</button>
    </>
  );
};

export default DraftModeTest;
