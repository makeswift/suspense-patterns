"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";

export default function Form() {
  const [form, formFields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: z.object({ name: z.string() }) });
    },
    defaultValue: { name: "John" },
  });

  // On the server, this will print `{ name: undefined }`
  console.log({ name: formFields.name.initialValue });

  return (
    <form {...getFormProps(form)}>
      <input
        {...getInputProps(formFields.name, { type: "text" })}
        className="bg-slate-900"
      />
    </form>
  );
}
