import { type Props as NumberInputProps } from "./inputs/number-input"
import { type Props as CheckboxProps } from "./inputs/checkbox"
import { type Props as RadioGroupProps } from "./inputs/radio-group"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export type Field =
  | {
      type: "radio"
      name: string
      label: string
      options: { label: string; value: string }[]
      defaultValue?: string
      required?: boolean
    }
  | {
      type: "checkbox"
      name: string
      label: string
      defaultValue?: boolean
      required?: boolean
    }
  | {
      type: "number"
      name: string
      label: string
      defaultValue?: number
      required?: boolean
    }

export type FieldProps =
  | {
      type: "number"
      props: NumberInputProps
    }
  | {
      type: "checkbox"
      props: CheckboxProps
    }
  | {
      type: "radio"
      props: RadioGroupProps
    }

const createUrl = (pathname: string, params: URLSearchParams) => {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`

  return `${pathname}${queryString}`
}

export const useFormState = ({ fields }: { fields: Field[] }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [touched, setTouched] = useState(new Map<string, true | undefined>())
  const [errors, setErrors] = useState(new Map<string, string | undefined>())

  useEffect(() => {
    // revalidate
  }, [searchParams])

  const handleSubmit =
    (onSubmit: (formData: FormData) => void) =>
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      const nextTouched = new Map(touched)
      const nextErrors = new Map(errors)

      for (const field of fields) {
        nextTouched.set(field.name, true)

        // TODO: Properly validate fields
        if (field.required && !formData.get(field.name)) {
          nextErrors.set(field.name, "Field is required")
        } else {
          nextErrors.set(field.name, undefined)
        }
      }

      setTouched(nextTouched)
      setErrors(nextErrors)

      if (Array.from(nextErrors.values()).some((error) => Boolean(error))) {
        return
      }

      onSubmit?.(formData)
    }

  const fieldProps: FieldProps[] = fields.map((field) => {
    const props = {
      name: field.name,
      label: field.label,
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
            onCheckedChange(next: boolean) {
              const currentParams = Array.from(searchParams.entries())
              const newParams = currentParams.filter(
                ([key]) => key !== field.name
              )

              const href = createUrl(
                pathname,
                new URLSearchParams([...newParams, [field.name, String(next)]])
              )

              router.push(href)
            },
          },
        }
      case "number":
        const value = Number(searchParams.get(field.name))

        return {
          type: "number" as const,
          props: {
            ...props,
            value: isNaN(value) ? value : field.defaultValue,
            onChange(e: React.ChangeEvent<HTMLInputElement>) {
              const currentParams = Array.from(searchParams.entries())
              const newParams = [
                ...currentParams.filter(([key]) => key !== field.name),
                [field.name, e.currentTarget.value],
              ]

              const href = createUrl(pathname, new URLSearchParams(newParams))

              router.push(href)
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
            onChange(next: string) {
              const currentParams = Array.from(searchParams.entries())
              const newParams = [
                ...currentParams.filter(([key]) => key !== field.name),
                [field.name, next],
              ]

              const href = createUrl(pathname, new URLSearchParams(newParams))

              router.push(href)
            },
          },
        }
    }
  })

  return { fieldProps, handleSubmit }
}
