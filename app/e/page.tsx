import { Suspense } from 'react'
import { ProductDetailsForm } from './product-details-form'

async function action(formData: FormData) {
  'use server'

  console.log(formData)
}

export default function Page() {
  return (
    <Suspense>
      <ProductDetailsForm
        action={action}
        fields={[
          {
            type: 'number',
            name: 'quantity',
            label: 'Quantity',
            required: true,
            min: 10,
          },
          {
            type: 'radio',
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
            type: 'radio',
            name: 'color',
            label: 'Color',
            options: [
              { label: 'Red', value: 'red' },
              { label: 'Green', value: 'green' },
              { label: 'Blue', value: 'blue' },
            ],
          },
          {
            type: 'checkbox',
            name: 'insurance',
            label: 'Include insurance?',
            required: true,
          },
        ]}
      />
    </Suspense>
  )
}
