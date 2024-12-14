import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as Label from "@radix-ui/react-label";
import React from "react";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  options: {
    label: string;
    value: string;
  }[];
  required?: boolean;
  error?: string;
}

export function RadioGroup({
  label,
  name,
  value,
  options,
  error,
  ...props
}: Props) {
  return (
    <div className="space-y-2">
      <fieldset>
        <legend>{label}</legend>

        {options.map((option) => (
          <div key={option.value}>
            <input
              {...props}
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              checked={value === option.value}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </fieldset>
      <div className="text-red-500 text-sm">{error}</div>
    </div>
  );
}
