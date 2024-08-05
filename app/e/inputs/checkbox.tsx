"use client"

import * as React from "react"

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Checkbox({ name, label, error, checked, ...props }: Props) {
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
      <div className="text-sm text-red-500">{error}</div>
    </div>
  )
}
