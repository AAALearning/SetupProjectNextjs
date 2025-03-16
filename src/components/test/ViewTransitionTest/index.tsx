"use client";

import Link from "next/link";
import { useState, version, unstable_ViewTransition as ViewTransition, useTransition } from "react";
import { flushSync } from "react-dom";

// View transition api
const ViewTransitionTest = () => {
  const [scale, setScale] = useState(1);
  const [transformX, setTransformX] = useState(1);
  const [_, startTransition] = useTransition();
  return (
    <>
      <div>HTML thuần</div>
      <button
        onClick={() => {
          document.startViewTransition(() => {
            flushSync(() => setScale(scale * 2));
          });
        }}
      >
        Toggle
      </button>
      <br />
      <div style={{ display: "inline-block", scale, transformOrigin: "top left", viewTransitionName: "test" }}>
        Hello
      </div>

      <div>React {version}</div>
      <button
        onClick={() => {
          startTransition(() => {
            setTransformX(transformX + 100);
          });
        }}
      >
        Toggle
      </button>
      <br />
      <ViewTransition>
        <div style={{ display: "inline-block", transform: `translateX(${transformX}px)`, transformOrigin: "top left" }}>
          Hello
        </div>
      </ViewTransition>

      <br />
      <div>MPA chạy k chuẩn</div>
      <Link href="/test/test2" prefetch={true}>
        Go to test2
      </Link>
      <ViewTransition name="x">
        <div>Test</div>
      </ViewTransition>
    </>
  );
};

export default ViewTransitionTest;
