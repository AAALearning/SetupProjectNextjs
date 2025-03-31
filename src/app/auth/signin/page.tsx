"use client";

import Form from "next/form";
import { useActionState } from "react";
import signIn from "../actions/signin";
import { useSearchParams } from "next/navigation";

type SignInForm = {
  formField: { password: string; email: string };
  error: string | void;
};

const callSignIn = async (previousState: SignInForm, formData: FormData): Promise<SignInForm> => {
  let error: SignInForm["error"] = undefined;
  try {
    error = await signIn(formData);
  } catch (ex) {
    if (ex instanceof Error) {
      error = ex.message;
    } else {
      console.error("Unknown error:", ex);
    }
  }
  return {
    formField: {
      password: formData.get("password") as string,
      email: formData.get("email") as string,
    },
    error,
  };
};

const Page = () => {
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(callSignIn, {
    formField: {
      password: "",
      email: "",
    },
    error: undefined,
  });
  return (
    <div>
      <h1>Sign In:: {searchParams.get("oauthError")}</h1>
      <Form action={formAction}>
        <input required name="email" type="email" placeholder="Email" defaultValue={state?.formField.email} />
        <input
          required
          name="password"
          type="password"
          placeholder="Password"
          defaultValue={state?.formField.password}
        />
        <button type="submit">Sign In</button>
        <div style={{ color: "red" }}>{state?.error ? (state?.error as string) : ""}</div>
      </Form>
      {isPending && <div>...Loading</div>}
    </div>
  );
};

export default Page;
