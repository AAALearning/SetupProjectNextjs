"use client";

import { useState } from "react";

const ClientTemplate = () => {
  const [count, setCount] = useState(1);
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

export default ClientTemplate;
