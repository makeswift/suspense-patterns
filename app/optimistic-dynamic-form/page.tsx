import { parseWithZod } from '@conform-to/zod'
import { Todos } from './todos'
import { todosSchema } from './schema'

export default function Page() {
  return (
    <Todos
      initialTodos={[{ id: 0, title: 'First todo' }]}
      action={async (state, payload) => {
        'use server'

        const submission = parseWithZod(payload, { schema: todosSchema })

        if (submission.status !== 'success') {
          return { lastResult: submission.reply(), todos: state.todos }
        }

        await new Promise((resolve) => setTimeout(resolve, 1000))

        return {
          lastResult: submission.reply({ resetForm: true }),
          todos: submission.value.todos,
        }
      }}
    />
  )
}
