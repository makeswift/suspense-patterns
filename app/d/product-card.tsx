import { Suspense, use } from "react"

import { format } from "@/lib/utils"

interface Props {
  name: string
  price: number | Promise<number>
  color: string
  size: string
}

function Price({ price }: { price: number | Promise<number> }) {
  const value = use(Promise.resolve(price))

  return <>${format(value)}</>
}

export function ProductCard({ name, price, color, size }: Props) {
  return (
    <div className="p-5 rounded-md bg-white/20 space-y-2">
      <div className="text-xl mb-2">{name}</div>
      <div className="text-md">
        <Suspense fallback="...">
          <Price price={price} />
        </Suspense>
      </div>
      <div className="flex gap-x-2">
        <div className="text-sm text-gray-500">Color</div>
        <div>{color}</div>
      </div>
      <div className="flex gap-x-2">
        <div className="text-sm text-gray-500">Size</div>
        <div>{size}</div>
      </div>
    </div>
  )
}
