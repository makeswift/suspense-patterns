'use client'

import { getFormProps, getInputProps, SubmissionResult, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { startTransition, useActionState, useOptimistic, useState } from 'react'
import { requestFormReset } from 'react-dom'
import { schema } from './schema'

type Action<State, Payload> = (state: Awaited<State>, payload: Payload) => State | Promise<State>

export function MessagesForm({
  initialMessages,
  action,
}: {
  initialMessages: string[]
  action: Action<{ messages: string[]; lastResult: SubmissionResult | null }, FormData>
}) {
  const [{ lastResult, messages }, formAction, isPending] = useActionState(action, {
    messages: initialMessages,
    lastResult: null,
  })
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (messages: string[], message: string) => [...messages, message + ' (optimistic)'],
  )
  const [form, fields] = useForm({
    lastResult,
    constraint: getZodConstraint(schema),
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: schema })
    },
    onSubmit(event, { submission, formData }) {
      event.preventDefault()

      if (submission?.status !== 'success') return

      const message = submission.value.message

      startTransition(async () => {
        requestFormReset(event.currentTarget)
        addOptimisticMessage(message)
        formAction(formData)
      })
    },
  })

  return (
    <div>
      <form {...getFormProps(form)} action={formAction} className="flex flex-col w-80">
        <label htmlFor={fields.message.id}>Message</label>
        <input {...getInputProps(fields.message, { type: 'text' })} className="bg-slate-800" />
        <div id={fields.message.errorId}>{fields.message.errors}</div>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Sending...' : 'Send'}
        </button>
      </form>
      {optimisticMessages.map((message, idx) => (
        <li key={idx}>{message}</li>
      ))}
    </div>
  )
}
