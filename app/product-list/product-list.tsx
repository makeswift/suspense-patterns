import { FilterOption } from "./filter-option";
import { ProductCard } from "./product-card";

interface Product {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
}

interface Option {
  name: string;
  value: string;
}

interface Facet {
  name: string;
  value: string;
  options: Option[];
}

interface Props {
  title: string;
  products: Product[];
  activeFacets?: Facet[];
  facets?: Facet[];
}

export function ProductList({ title, products, facets }: Props) {
  return (
    <div className="space-y-2">
      <div className="text-xl mb-2">
        {title} - {products.length}
      </div>
      <div className="p-5 grid grid-cols-12">
        <div className="flex gap-4 col-span-9 flex-wrap">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
        <div className="col-span-3">
          <form>
            {facets?.map((facet, index) => (
              <div key={index}>
                <div className="text-lg mb-2">{facet.name}</div>
                <ul>
                  {facet.options.map((option, index) => (
                    <li className="mb-2" key={index}>
                      <FilterOption facet={facet} option={option} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}
