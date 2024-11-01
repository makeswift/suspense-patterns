import { parseWithZod } from '@conform-to/zod'
import { MessagesForm } from './messages-form'
import { schema } from './schema'

export default function Page() {
  const initialMessages = ['Hello, world!']

  return (
    <MessagesForm
      initialMessages={initialMessages}
      action={async function sendMessage({ messages }, formData) {
        'use server'
        const submission = parseWithZod(formData, { schema: schema })

        if (submission.status !== 'success') return { messages, lastResult: submission.reply() }

        await new Promise((resolve) => setTimeout(resolve, 1000))

        return {
          messages: [...messages, submission.value.message],
          lastResult: submission.reply({ resetForm: true }),
        }
      }}
    />
  )
}
