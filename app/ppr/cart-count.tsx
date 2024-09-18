export async function CartCount({ count }: { count: number | Promise<number> }) {
  return <p>Count: {count}</p>
}
