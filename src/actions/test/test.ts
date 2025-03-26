"use server";

import { draftMode } from "next/headers";
import { permanentRedirect, redirect } from "next/navigation";

const redirectToTest1 = () => {
  permanentRedirect("/test/test1");
};

const testDraftMode = async () => {
  if (false) {
    // Nên có thêm secret mới cho trigger
    return new Response("Invalid token", { status: 401 });
  }
  const draft = await draftMode();
  if (draft.isEnabled) draft.disable();
  else draft.enable();
  redirect("/test/test2");
};

export default redirectToTest1;

export { testDraftMode };
