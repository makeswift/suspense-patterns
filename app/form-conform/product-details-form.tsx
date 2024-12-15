"use client";

import {
  FormProvider,
  getInputProps,
  SubmissionResult,
  useField,
  useForm,
} from "@conform-to/react";
import { RadioGroup } from "./inputs/radio-group";
import { Checkbox } from "./inputs/checkbox";
import { NumberInput } from "./inputs/number-input";
import { Field } from "./types";
import { TextInput } from "./inputs/text-input";
import { parseWithZod } from "@conform-to/zod";
import { generateZodSchema } from "./utils";
import { useActionState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

interface Props {
  fields: Field[];
  action: (prevState: unknown, formData: FormData) => Promise<SubmissionResult>;
}

function FormField({ field }: { field: Field }) {
  const [meta] = useField(field.name);
  const searchParams = useSearchParams();

  switch (field.type) {
    case "number":
      return (
        <NumberInput
          {...getInputProps(meta, { type: "number" })}
          label={field.label}
          errors={meta.errors}
          defaultValue={
            searchParams.get(field.name) ?? (meta.initialValue as string)
          }
        />
      );
    case "text":
      return (
        <TextInput
          {...getInputProps(meta, { type: "text" })}
          label={field.label}
          errors={meta.errors}
          defaultValue={
            searchParams.get(field.name) ?? (meta.initialValue as string)
          }
        />
      );
    case "checkbox":
      return (
        <Checkbox
          {...getInputProps(meta, { type: "checkbox" })}
          label={field.label}
          errors={meta.errors}
          defaultChecked={
            (searchParams.get(field.name) ?? meta.initialValue) === "on"
          }
        />
      );
    case "radio":
      return (
        <RadioGroup
          {...getInputProps(meta, { type: "radio" })}
          label={field.label}
          options={field.options}
          errors={meta.errors}
          defaultValue={
            searchParams.get(field.name) ?? (meta.initialValue as string)
          }
        />
      );
  }
}

export function ProductDetailsForm({ fields, action }: Props) {
  const schema = generateZodSchema(fields);
  const [lastResult, formAction] = useActionState(action, undefined);
  const defaultValue = useMemo(
    () =>
      fields.reduce(
        (defaults, field) => {
          if (field.type === "checkbox") {
            defaults[field.name] = field.defaultValue ? "on" : undefined;
          } else {
            defaults[field.name] = String(field.defaultValue);
          }

          return defaults;
        },
        {} as Record<string, string | null | undefined>,
      ),
    [fields],
  );
  const [form] = useForm({
    lastResult,
    defaultValue,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
  });

  return (
    <FormProvider context={form.context}>
      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={formAction}
        noValidate
        className="space-y-8"
      >
        {fields.map((field) => {
          return <FormField key={field.name} field={field} />;
        })}
        <button
          formAction={formAction}
          className="bg-violet text-white p-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
