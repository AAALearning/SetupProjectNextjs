import redirectToTest1 from "@/actions/test/test";
import { draftMode } from "next/headers";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

const Test = async () => {
  const { isEnabled } = await draftMode();
  return (
    <>
      <div>Draft mode is on::{isEnabled ? "true" : "false"}</div>
      <hr />
      <ViewTransition name="x">
        <div style={{ fontSize: "50px" }}>Test</div>
      </ViewTransition>
      <Link href="/test/test1">Go to test1</Link>
      <form action={redirectToTest1}>
        <button type="submit">Redirect to test1 via server actions permanentRedirect</button>
      </form>
    </>
  );
};

export default Test;
