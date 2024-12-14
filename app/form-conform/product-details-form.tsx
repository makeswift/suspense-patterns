"use client";

import {
  FormProvider,
  getFieldsetProps,
  getInputProps,
  SubmissionResult,
  useField,
  useForm,
} from "@conform-to/react";
import { RadioGroup } from "./inputs/radio-group";
import { Checkbox } from "./inputs/checkbox";
import { NumberInput } from "./inputs/number-input";
import { Field } from "./types";
import { useFormState } from "react-dom";
import { TextInput } from "./inputs/text-input";
import { parseWithZod } from "@conform-to/zod";
import { generateZodSchema } from "./utils";
import { useCallback, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface Props {
  fields: Field[];
  action: (prevState: unknown, formData: FormData) => Promise<SubmissionResult>;
}

function FormField({ field }: { field: Field }) {
  const [meta] = useField(field.name);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const createQueryString = useCallback(
    ({ key, value }: { key: string; value: unknown }) => {
      const currentParams = Array.from(searchParams.entries());
      const newParams = currentParams.filter(([k]) => k !== key);

      if (value) {
        newParams.push([key, String(value)]);
      }

      return new URLSearchParams(newParams);
    },
    [searchParams],
  );

  useEffect(() => {
    router.replace(
      `${pathname}?${createQueryString({
        key: field.name,
        value: meta.value,
      })}`,
      { scroll: false },
    );
  }, [router, pathname, meta.value, field.name, createQueryString]);

  switch (field.type) {
    case "number":
      return (
        <NumberInput
          {...getInputProps(meta, { type: "number" })}
          label={field.label}
          errors={meta.errors}
          defaultValue={searchParams.get(field.name) ?? undefined}
        />
      );
    case "text":
      return (
        <TextInput
          {...getInputProps(meta, { type: "text" })}
          label={field.label}
          errors={meta.errors}
          defaultValue={searchParams.get(field.name) ?? undefined}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          {...getInputProps(meta, { type: "checkbox" })}
          label={field.label}
          errors={meta.errors}
          defaultChecked={searchParams.get(field.name) === "on"}
        />
      );
    case "radio":
      return (
        <RadioGroup
          {...getInputProps(meta, { type: "radio" })}
          label={field.label}
          options={field.options}
          errors={meta.errors}
          defaultValue={searchParams.get(field.name) ?? undefined}
        />
      );
  }
}

export function ProductDetailsForm({ fields, action }: Props) {
  const schema = generateZodSchema(fields);
  const [lastResult, formAction] = useFormState(action, undefined);
  const [form] = useForm({
    lastResult,
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
