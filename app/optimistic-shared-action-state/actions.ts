'use server'

import { SubmissionResult } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { formSchema } from './schema'

export async function decrement(
  {
    lastResult,
    count,
  }: {
    lastResult: SubmissionResult | null
    count: number
  },
  formData: FormData,
): Promise<{ lastResult: SubmissionResult | null; count: number }> {
  formData.set('count', String(count - 1))

  const submission = parseWithZod(formData, { schema: formSchema })

  if (submission.status !== 'success') return { lastResult: submission.reply(), count }

  return { lastResult: submission.reply(), count: submission.value.count }
}

export async function increment(
  {
    lastResult,
    count,
  }: {
    lastResult: SubmissionResult | null
    count: number
  },
  formData: FormData,
): Promise<{ lastResult: SubmissionResult | null; count: number }> {
  formData.set('count', String(count + 1))

  const submission = parseWithZod(formData, { schema: formSchema })

  if (submission.status !== 'success') return { lastResult: submission.reply(), count }

  return { lastResult: submission.reply(), count: submission.value.count }
}
