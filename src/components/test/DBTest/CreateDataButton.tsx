"use client";

import { addDBData } from "@/actions/test/db";

const CreateDataButton = () => {
  return (
    <>
      <button
        onClick={() =>
          addDBData({
            name: "Ryan",
            email: "hieucuopbien123@gmail.com" + Math.random(),
          })
        }
      >
        Create data
      </button>
    </>
  );
};

export default CreateDataButton;
