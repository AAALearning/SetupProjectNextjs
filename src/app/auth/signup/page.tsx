"use client";

import Form from "next/form";
import signUp from "../actions/signup";
import { useActionState } from "react";

type FormField = {
  formField: { name: string; password: string; email: string };
  error: string | void;
};

const callSignUp = async (previousState: FormField, formData: FormData): Promise<FormField> => {
  let error: FormField["error"] = undefined;
  try {
    error = await signUp(formData);
  } catch (ex) {
    if (ex instanceof Error) {
      error = ex.message;
    } else {
      console.error("Unknown error:", ex);
    }
  }
  return {
    formField: {
      name: formData.get("username") as string,
      password: formData.get("password") as string,
      email: formData.get("email") as string,
    },
    error,
  };
};

const Page = () => {
  const [state, formAction, isPending] = useActionState(callSignUp, {
    formField: {
      name: "",
      password: "",
      email: "",
    },
    error: undefined,
  });
  return (
    <div>
      <h1>Sign Up</h1>
      <Form action={formAction}>
        <input required name="username" type="text" placeholder="Username" defaultValue={state?.formField.name} />
        <input required name="email" type="email" placeholder="Email" defaultValue={state?.formField.email} />
        <input
          required
          name="password"
          type="password"
          placeholder="Password"
          defaultValue={state?.formField.password}
        />
        <button type="submit">Sign Up</button>
        <div style={{ color: "red" }}>{state?.error ? (state?.error as string) : ""}</div>
      </Form>
      {isPending && <div>...Loading</div>}
    </div>
  );
};

export default Page;
