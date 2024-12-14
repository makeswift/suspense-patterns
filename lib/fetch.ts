export async function getPrice(id: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id * 1000);
    }, 1000);
  });
}

interface Product {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
}

export const Colors = [
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
];
export const Sizes = [
  { name: "Small", value: "small" },
  { name: "Medium", value: "medium" },
  { name: "Large", value: "large" },
];

const products = Array.from({ length: 100 }).map((_, index) => ({
  id: index.toString(),
  name: `Product ${index}`,
  price: index * 1000,
  color: Colors[Math.floor(Math.random() * Colors.length)].value,
  size: Sizes[Math.floor(Math.random() * Sizes.length)].value,
}));

export async function getProducts({
  color,
  size,
}: {
  color: string[];
  size: string[];
}): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        products.filter(
          (product) =>
            (color.includes(product.color) || color.length === 0) &&
            (size.includes(product.size) || size.length === 0),
        ),
      );
    }, 10);
  });
}
