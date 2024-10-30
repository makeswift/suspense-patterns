"use client"

import * as React from "react"

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  errors?: string[]
}

export function Checkbox({ name, label, errors, checked, ...props }: Props) {
  return (
    <div className="space-y-2">
      <input
        {...props}
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
      />
      <label htmlFor={name}>{label}</label>
      {errors?.map((error, index) => (
        <div key={index} className="text-red-500 text-sm">
          {error}
        </div>
      ))}
    </div>
  )
}
