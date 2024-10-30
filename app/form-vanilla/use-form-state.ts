import { type Props as NumberInputProps } from "./inputs/number-input"
import { type Props as CheckboxProps } from "./inputs/checkbox"
import { type Props as RadioGroupProps } from "./inputs/radio-group"
import { type Props as TextInputProps } from "./inputs/text-input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { Field } from "./types"
import { createUrl, validate } from "./utils"

export type Input =
  | { type: "number"; props: NumberInputProps }
  | { type: "checkbox"; props: CheckboxProps }
  | { type: "radio"; props: RadioGroupProps }
  | { type: "text"; props: TextInputProps }

interface Props {
  fields: Field[]
}

export const useFormState = ({ fields }: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [touched, setTouched] = useState(new Map<string, true | undefined>())
  const [errors, setErrors] = useState(new Map<string, string | undefined>())
  const updateParams = useCallback(
    ({ key, value }: { key: string; value: string | undefined }) => {
      const currentParams = Array.from(searchParams.entries())
      const newParams = currentParams.filter(([k]) => k !== key)

      if (value) {
        newParams.push([key, value])
      }

      return createUrl(pathname, new URLSearchParams(newParams))
    },
    [pathname, searchParams]
  )

  const handleSubmit =
    (action: (formData: FormData) => void) =>
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      const nextTouched = new Map(touched)
      const nextErrors = new Map(errors)

      for (const field of fields) {
        nextTouched.set(field.name, true)

        const { isValid, errorMessage } = validate({
          field,
          data: formData.get(field.name),
        })

        if (!isValid) {
          nextErrors.set(field.name, errorMessage)
        } else {
          nextErrors.set(field.name, undefined)
        }
      }

      setTouched(nextTouched)
      setErrors(nextErrors)

      if (Array.from(nextErrors.values()).some((error) => Boolean(error))) {
        return
      }

      action?.(formData)
    }

  const inputs: Input[] = fields.map((field) => {
    const props = {
      label: field.label,
      name: field.name,
      required: field.required,
      error: touched.get(field.name) && errors.get(field.name),
      onBlur() {
        setTouched((prev) => new Map(prev.set(field.name, true)))
      },
    }

    switch (field.type) {
      case "checkbox":
        return {
          type: "checkbox" as const,
          props: {
            ...props,
            checked: searchParams.get(field.name) === "true",
            onChange(e) {
              router.replace(
                updateParams({
                  key: field.name,
                  value: String(e.currentTarget.checked),
                })
              )
            },
          },
        }
      case "number":
        return {
          type: "number" as const,
          props: {
            ...props,
            min: field.min,
            max: field.max,
            value: searchParams.get(field.name) ?? field.defaultValue ?? "",
            onChange(e) {
              router.replace(
                updateParams({
                  key: field.name,
                  value: e.currentTarget.value,
                })
              )
            },
          },
        }
      case "radio":
        return {
          type: "radio" as const,
          props: {
            ...props,
            options: field.options,
            value: searchParams.get(field.name) ?? field.defaultValue,
            onChange(e) {
              router.replace(
                updateParams({
                  key: field.name,
                  value: e.currentTarget.value,
                })
              )
            },
          },
        }
      case "text":
        return {
          type: "text" as const,
          props: {
            ...props,
            value: searchParams.get(field.name) ?? field.defaultValue ?? "",
            onChange(e) {
              router.replace(
                updateParams({
                  key: field.name,
                  value: e.currentTarget.value,
                })
              )
            },
          },
        }
    }
  })

  return { handleSubmit, inputs }
}
