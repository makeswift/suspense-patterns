'use client'

import { useTransition } from 'react'
import { useFormState } from 'react-dom'

// Use Next.js 14 to reproduce an issue where using `useTransition` after `useFormState` results in
// `isChanging` to stay `true` after `formAction` has been called once.
export default function Page() {
  const [_state, formAction] = useFormState(async (_state: unknown, formData: FormData) => {
    console.log(Object.fromEntries(formData))
  }, null)
  const [isChanging, startChanging] = useTransition()

  return (
    <form>
      <label>
        Input:
        <input
          className="bg-slate-800"
          onChange={(event) => {
            const value = event.target.value

            const formData = new FormData()

            formData.set('value', value)

            startChanging(() => {
              formAction(formData)
            })
          }}
        />
      </label>
      <p>{isChanging ? 'Changing...' : 'Not changing'}</p>
    </form>
  )
}
