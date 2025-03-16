"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const DynamicComp = dynamic(() => import("./DynamicComp"), {
  ssr: false,
  loading: () => <div>...Loading</div>,
});

// Dynamic import
const DynamicTest = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      <br />
      {open && <DynamicComp />}
    </>
  );
};

export default DynamicTest;
