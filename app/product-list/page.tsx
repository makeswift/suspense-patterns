import { getProducts, Colors, Sizes } from '@/lib/fetch'
import { ProductList } from './product-list'

interface Props {
  searchParams: Promise<{
    color?: string[]
    size?: string[]
  }>
}

export default async function Page({ searchParams }: Props) {
  const { color, size } = await searchParams
  const products = await getProducts({
    color: color ?? [],
    size: size ?? [],
  })

  return (
    <div>
      <ProductList
        title="All Products"
        products={products}
        facets={[
          {
            name: 'Color',
            value: 'color',
            options: Colors,
          },
          {
            name: 'Size',
            value: 'size',
            options: Sizes,
          },
        ]}
      />
    </div>
  )
}
