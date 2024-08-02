"use client"

import { RadioGroup } from "./inputs/radio-group"
import { Checkbox } from "./inputs/checkbox"
import { NumberInput } from "./inputs/number-input"
import { useFormState, Field } from "./use-form-state"

interface Props {
  fields: Field[]
  onSubmit: (formData: FormData) => void
}

export function ProductDetailsForm({ fields, onSubmit }: Props) {
  const { fieldProps, handleSubmit } = useFormState({ fields })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {fieldProps.map((field, index) => {
        switch (field.type) {
          case "number":
            return <NumberInput key={index} {...field.props} />
          case "checkbox":
            return <Checkbox key={index} {...field.props} />
          case "radio":
            return <RadioGroup key={index} {...field.props} />
        }
      })}
      <button type="submit" className="bg-violet text-white p-2 rounded-lg">
        Submit
      </button>
    </form>
  )
}
