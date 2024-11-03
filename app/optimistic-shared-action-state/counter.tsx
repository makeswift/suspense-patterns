'use client'

import { getFormProps, getInputProps, SubmissionResult, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { formSchema } from './schema'
import { startTransition, useActionState, useOptimistic } from 'react'

export function Counter({
  action,
}: {
  action(
    state: { lastResult: SubmissionResult | null; count: number },
    payload: FormData,
  ): Promise<{ lastResult: SubmissionResult | null; count: number }>
}) {
  const [{ lastResult, count }, formAction] = useActionState(action, { lastResult: null, count: 0 })
  const [optimisticCount, optimisticAction] = useOptimistic(
    count,
    (prevCount: number, formData: FormData) => {
      const intent = formData.get('intent')

      switch (intent) {
        case 'decrement':
          return prevCount - 1

        case 'increment':
          return prevCount + 1

        default:
          return prevCount
      }
    },
  )
  const [form, fields] = useForm({
    lastResult,
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
    onValidate({ formData }) {
      const intent = formData.get('intent')

      switch (intent) {
        case 'decrement':
          formData.set('count', String(optimisticCount - 1))
          break

        case 'increment':
          formData.set('count', String(optimisticCount + 1))
          break
      }

      return parseWithZod(formData, { schema: formSchema })
    },
    onSubmit(event, { formData }) {
      event.preventDefault()

      startTransition(async () => {
        optimisticAction(formData)
        formAction(formData)
      })
    },
  })

  return (
    <div className="w-screen h-screen flex flex-col">
      <form
        {...getFormProps(form)}
        action={formAction}
        className="flex flex-col flex-1 justify-center items-center"
      >
        <div className="flex gap-4">
          <button name="intent" value="decrement">
            -
          </button>
          <p className="text-4xl">{optimisticCount}</p>
          <button name="intent" value="increment">
            +
          </button>
        </div>
        <div className="text-red-500 text-sm">{fields.count.errors}</div>
      </form>
    </div>
  )
}
