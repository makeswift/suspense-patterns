import { Suspense } from 'react'
import { CartCount } from './cart-count'

export async function Header({ cartCount }: { cartCount: number | Promise<number> }) {
  return (
    <nav>
      <ul>
        <li>
          <a href="/a">A</a>
        </li>
        <li>
          <a href="/e">E</a>
        </li>
        <li>
          <a href="/g">G</a>
        </li>
        <li>
          <a href="/ppr">PPR</a>
        </li>
      </ul>
      <Suspense fallback={<p>Loading cart count...</p>}>
        <CartCount count={cartCount} />
      </Suspense>
    </nav>
  )
}
