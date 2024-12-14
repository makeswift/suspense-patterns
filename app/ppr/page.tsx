import { cookies } from "next/headers";
import { Header } from "./header";

export const experimental_ppr = true;

async function getCartCount(): Promise<number> {
  const cookieList = await cookies();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const count = cookieList.get("cart-count")?.value ?? "0";

  return parseInt(count, 10);
}

export default function Page() {
  return <Header cartCount={getCartCount()} />;
}
