export interface FormField {
  name: string
  label: string
  error?: string | undefined
}

export interface RadioField extends FormField {
  type: "radio"
  options: { label: string; value: string }[]
  defaultValue?: string
  required?: boolean
}

export interface CheckboxField extends FormField {
  type: "checkbox"
  defaultValue?: boolean
  required?: boolean
}

export interface NumberField extends FormField {
  type: "number"
  defaultValue?: number
  required?: boolean
  min?: number
  max?: number
}

export interface TextField extends FormField {
  type: "text"
  defaultValue?: number
  required?: boolean
  pattern?: string
}

export type Field = RadioField | CheckboxField | NumberField | TextField
