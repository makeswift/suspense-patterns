import { getPrice } from "@/lib/fetch";

import { Card } from "./card";

export default function Page() {
  return <Card name="Bob" price={getPrice(5)} />;
}
