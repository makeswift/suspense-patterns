interface Props {
  name: string
  price: React.ReactNode
}

export function Card({ name, price }: Props) {
  return (
    <div className="p-5 rounded-md bg-white/20 space-y-2">
      <div className="text-xl mb-2">{name}</div>
      <div className="text-md">{price}</div>
    </div>
  )
}
