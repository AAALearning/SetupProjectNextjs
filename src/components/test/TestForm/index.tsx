"use client";

import Form from "next/form";
import { useActionState } from "react";

type FormTestData = {
  formField: { name: string; age: number | null };
  data: { name: string } | null;
};

const testCallApi = async (previousState: FormTestData, formData: FormData): Promise<FormTestData> => {
  const name = formData.get("name") as string;
  const age = Number(formData.get("age"));

  // Có thể validate input thủ công ở đây r trả lỗi vào state show ra ok.
  console.log(name + " - " + age);

  const raw = await fetch(`/api/test?name=${encodeURIComponent(name)}`);
  const res = await raw.json();
  return {
    formField: {
      name,
      age,
    },
    data: res,
  };
};

const TestForm = () => {
  const [state, submitAction, isPending] = useActionState(testCallApi, {
    formField: {
      name: "Default",
      age: null,
    },
    data: null,
  });

  return (
    <>
      <Form action={submitAction} className="[&_input]:border-solid [&_input]:border-[2px] [&_input]:border-black">
        <input type="text" name="name" defaultValue={state?.formField?.name} />
        <input type="number" name="age" defaultValue={state?.formField?.age ?? undefined} />
        <button disabled={isPending} type="submit">
          Submit
        </button>
      </Form>
      {state?.data?.name && <div>{state.data.name}</div>}
      {isPending && <div>...Loading</div>}
    </>
  );
};

export default TestForm;
