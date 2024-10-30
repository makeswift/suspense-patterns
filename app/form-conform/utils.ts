import { Field } from "./types"
import { z } from "zod"

export const createUrl = (pathname: string, params: URLSearchParams) => {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`

  return `${pathname}${queryString}`
}

export const validate = ({
  field,
  data,
}: {
  field: Field
  data: FormDataEntryValue | null
}): { isValid: boolean; errorMessage?: string } => {
  if (field.required && !data) {
    return { isValid: false, errorMessage: `${field.name} is required.` }
  }

  if ("min" in field && field.min != null && Number(data) < field.min) {
    return {
      isValid: false,
      errorMessage: `${field.label} should be greater than ${field.min}`,
    }
  }

  if ("max" in field && field.max != null && Number(data) > field.max) {
    return {
      isValid: false,
      errorMessage: `${field.label} should be less than ${field.max}`,
    }
  }

  if (
    "pattern" in field &&
    field.pattern != null &&
    !new RegExp(field.pattern).test(String(data))
  ) {
    return {
      isValid: false,
      errorMessage: `${field.label} should match the pattern ${field.pattern}`,
    }
  }

  return { isValid: true }
}

export function generateZodSchema(fields: Field[]) {
  const schema: Record<string, z.ZodType<any>> = {}

  fields.forEach((field) => {
    let fieldSchema
    switch (field.type) {
      case "number":
        fieldSchema = z.number()

        if (field.min != null) fieldSchema = fieldSchema.min(field.min)
        if (field.max != null) fieldSchema = fieldSchema.max(field.max)

        schema[field.name] = fieldSchema
        break
      case "checkbox":
        fieldSchema = z.boolean()

        schema[field.name] = fieldSchema
        break
      case "text":
      case "radio":
        fieldSchema = z.string()

        schema[field.name] = fieldSchema
        break
    }

    if (!field.required) schema[field.name] = schema[field.name].optional()
  })

  return z.object(schema)
}
