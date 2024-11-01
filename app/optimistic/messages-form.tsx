'use client'

import { startTransition, useActionState, useOptimistic, useState } from 'react'
import { requestFormReset } from 'react-dom'

export function MessagesForm({
  initialMessages,
  action,
}: {
  initialMessages: string[]
  action(messages: string[], message: string): Promise<string[]>
}) {
  const [messages, formAction, isPending] = useActionState(action, initialMessages)
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (messages: string[], message: string) => [...messages, message + ' (optimistic)'],
  )
  const [message, setMessage] = useState('')

  return (
    <div>
      <form
        action={formAction.bind(null, message)}
        onSubmit={(event) => {
          event.preventDefault()

          startTransition(async () => {
            requestFormReset(event.currentTarget)

            addOptimisticMessage(message)
            formAction(message)
          })
        }}
      >
        <input
          className="bg-slate-500"
          type="text"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
        />
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
