"use client"

import { useFormStatus } from "react-dom"

export function LoadMoreButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const formStatus = useFormStatus()

  return (
    <button
      {...props}
      type="submit"
      className="bg-violet text-white p-2 rounded-lg"
    >
      {formStatus.pending ? "Loading..." : "Load More"}
    </button>
  )
}
