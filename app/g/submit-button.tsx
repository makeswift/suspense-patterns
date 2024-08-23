"use client"

import { useFormStatus } from "react-dom"

export function SubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const formStatus = useFormStatus()

  return (
    <button
      {...props}
      type="submit"
      className="bg-violet text-white p-2 rounded-lg"
    >
      {formStatus.pending ? "Submitting" : "Submit"}
    </button>
  )
}
