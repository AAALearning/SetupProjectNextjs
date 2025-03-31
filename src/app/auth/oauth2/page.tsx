"use client";

import { oAuthSignIn } from "../actions/oauth2";

const Page = () => {
  return (
    <div>
      <h1>OAuth2</h1>
      <button onClick={() => oAuthSignIn("discord")}>Discord</button>
    </div>
  );
};

export default Page;
