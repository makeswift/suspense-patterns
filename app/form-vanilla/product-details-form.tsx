"use client";

import { RadioGroup } from "./inputs/radio-group";
import { Checkbox } from "./inputs/checkbox";
import { NumberInput } from "./inputs/number-input";
import { useFormState } from "./use-form-state";
import { Field } from "./types";
import { useEffect, useState } from "react";
import { TextInput } from "./inputs/text-input";

interface Props {
  fields: Field[];
  action: (formData: FormData) => void;
}

export function ProductDetailsForm({ fields, action }: Props) {
  const { inputs, handleSubmit } = useFormState({ fields });
  const [jsEnabled, setJsEnabled] = useState(false);

  useEffect(() => setJsEnabled(true), []);

  return (
    <form
      noValidate={jsEnabled}
      onSubmit={handleSubmit(action)}
      action={action}
      className="space-y-8"
    >
      {inputs.map((field, index) => {
        switch (field.type) {
          case "number":
            return <NumberInput key={index} {...field.props} />;
          case "text":
            return <TextInput key={index} {...field.props} />;
          case "checkbox":
            return <Checkbox key={index} {...field.props} />;
          case "radio":
            return <RadioGroup key={index} {...field.props} />;
        }
      })}
      <button type="submit" className="bg-violet text-white p-2 rounded-lg">
        Submit
      </button>
    </form>
  );
}
