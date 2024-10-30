function Card({ children }: { children: React.ReactNode }) {
  return <div className="p-5 rounded-md bg-white/20 space-y-2">{children}</div>
}

function CardName({ children }: { children: React.ReactNode }) {
  return <div className="text-xl mb-2">{children}</div>
}

function CardPrice({ children }: { children: React.ReactNode }) {
  return <div className="text-md">{children}</div>
}

export { Card, CardName, CardPrice }
