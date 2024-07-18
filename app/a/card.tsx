import { Suspense, use } from "react"

import { format } from "@/lib/utils"

interface Props {
  name: string
  price: number | Promise<number>
}

function Price({ price }: { price: number | Promise<number> }) {
  const value = use(Promise.resolve(price))

  return <>${format(value)}</>
}

export function Card({ name, price }: Props) {
  return (
    <div className="p-5 rounded-md bg-white/20 space-y-2">
      <div className="text-xl mb-2">{name}</div>
      <div className="text-md">
        <Suspense fallback="...">
          <Price price={price} />
        </Suspense>
      </div>
    </div>
  )
}
