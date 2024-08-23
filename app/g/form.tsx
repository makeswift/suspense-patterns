"use client"

import { useFormState } from "react-dom"
import { LoadMoreButton } from "./load-more-button"
import { useState } from "react"

export type State = { hasMore: boolean; results: string[] }

export type Action = (prevState: State, formData: FormData) => Promise<State>

interface Props {
  action: Action
  children: React.ReactNode
}

export function Form({ action, children }: Props) {
  const [state, formAction] = useFormState(action, {
    hasMore: false,
    results: [],
  })

  return (
    <form action={formAction}>
      {children}
      <ul>
        {state.results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
      {state.hasMore && <LoadMoreButton />}
    </form>
  )
}
