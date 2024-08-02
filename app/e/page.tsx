import { ProductDetailsForm } from "./product-details-form"

async function action(formData: FormData) {
  "use server"

  console.log(formData)
}

export default function Page() {
  return (
    <ProductDetailsForm
      onSubmit={action}
      fields={[
        {
          type: "number",
          name: "quantity",
          label: "Quantity",
          required: true,
        },
        {
          type: "radio",
          name: "size",
          label: "Size",
          options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
        {
          type: "radio",
          name: "color",
          label: "Color",
          options: [
            { label: "Red", value: "red" },
            { label: "Green", value: "green" },
            { label: "Blue", value: "blue" },
          ],
        },
        {
          type: "checkbox",
          name: "insurance",
          label: "Include insurance?",
          required: true,
        },
      ]}
    />
  )
}
