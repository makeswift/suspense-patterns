import { getProducts, Colors, Sizes } from "@/lib/fetch"
import { ProductList } from "./product-list"

interface Props {
  searchParams: {
    color?: string[]
    size?: string[]
  }
}

export default async function Page({ searchParams }: Props) {
  const products = await getProducts({
    color: searchParams.color ?? [],
    size: searchParams.size ?? [],
  })

  return (
    <div>
      <ProductList
        title="All Products"
        products={products}
        facets={[
          {
            name: "Color",
            value: "color",
            options: Colors,
          },
          {
            name: "Size",
            value: "size",
            options: Sizes,
          },
        ]}
      />
    </div>
  )
}
