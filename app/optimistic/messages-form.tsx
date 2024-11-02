'use client'

import { startTransition, useActionState, useOptimistic } from 'react'
import { requestFormReset } from 'react-dom'

export function MessagesForm({
  initialMessages,
  action,
}: {
  initialMessages: string[]
  action(messages: string[], formData: FormData): Promise<string[]>
}) {
  const [messages, formAction, isPending] = useActionState(action, initialMessages)
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (messages: string[], message: string) => [...messages, message + ' (optimistic)'],
  )

  return (
    <div>
      <form
        action={formAction}
        onSubmit={(event) => {
          event.preventDefault()

          startTransition(async () => {
            requestFormReset(event.currentTarget)

            const formData = new FormData(event.currentTarget)
            const message = formData.get('message') as string

            addOptimisticMessage(message)
            formAction(formData)
          })
        }}
      >
        <input type="text" name="message" />
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
