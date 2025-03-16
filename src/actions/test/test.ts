"use server";

import { permanentRedirect } from "next/navigation";

const redirectToTest1 = () => {
  permanentRedirect("/test/test1");
};

export default redirectToTest1;
