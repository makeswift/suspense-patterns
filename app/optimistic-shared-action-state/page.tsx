import { SubmissionResult } from '@conform-to/react'
import { decrement, increment } from './actions'
import { Counter } from './counter'

export default function Page() {
  async function action(
    {
      lastResult,
      count,
    }: {
      lastResult: SubmissionResult | null
      count: number
    },
    formData: FormData,
  ): Promise<{ lastResult: SubmissionResult | null; count: number }> {
    'use server'

    await new Promise((resolve) => setTimeout(resolve, 250))

    const intent = formData.get('intent')

    switch (intent) {
      case 'decrement':
        return decrement({ lastResult, count }, formData)

      case 'increment':
        return increment({ lastResult, count }, formData)

      default:
        return { lastResult, count }
    }
  }

  return <Counter action={action} />
}
