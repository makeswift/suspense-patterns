import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as Label from "@radix-ui/react-label";
import React from "react";

export interface Props {
  label: string;
  name: string;
  options: {
    label: string;
    value: string;
  }[];
  required?: boolean;
  errors?: string[];
  defaultValue?: string;
}

export function RadioGroup({
  label,
  name,
  options,
  errors,
  defaultValue,
}: Props) {
  return (
    <div className="space-y-2">
      <fieldset>
        <legend>{label}</legend>

        {options.map((option) => (
          <div key={option.value}>
            <input
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              defaultChecked={option.value === defaultValue}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </fieldset>
      {errors?.map((error, index) => (
        <div key={index} className="text-red-500 text-sm">
          {error}
        </div>
      ))}
    </div>
  );
}
