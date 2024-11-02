import { SubmissionResult } from '@conform-to/react'
import { ProductDetailsForm } from './product-details-form'
import { generateZodSchema } from './utils'
import { parseWithZod } from '@conform-to/zod'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

const fields = [
  {
    type: 'number' as const,
    name: 'quantity',
    label: 'Quantity',
    required: true,
    min: 10,
  },
  {
    type: 'radio' as const,
    name: 'size',
    label: 'Size',
    options: [
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
    ],
    required: true,
  },
  {
    type: 'radio' as const,
    name: 'color',
    label: 'Color',
    options: [
      { label: 'Red', value: 'red' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
    ],
  },
  {
    type: 'checkbox' as const,
    name: 'insurance',
    label: 'Include insurance?',
    required: true,
  },
]

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>
}) {
  async function action(prevState: unknown, formData: FormData): Promise<SubmissionResult> {
    'use server'

    const submission = parseWithZod(formData, {
      schema: generateZodSchema(fields),
    })

    console.log({ submission })

    if (submission.status !== 'success') {
      return submission.reply()
    }

    return redirect('/f?value=')
  }

  return (
    <Suspense>
      <ProductDetailsForm action={action} fields={fields} />
    </Suspense>
  )
}
