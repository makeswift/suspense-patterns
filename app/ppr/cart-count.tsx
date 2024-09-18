import { cookies } from 'next/headers'

export async function CartCount() {
  const cookieList = cookies()

  await new Promise((resolve) => setTimeout(resolve, 2000))

  const count = cookieList.get('cart-count')?.value ?? 'No count'

  return <p>Count: {count}</p>
}
