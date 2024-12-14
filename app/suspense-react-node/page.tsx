import { Suspense } from "react";

import { getPrice } from "@/lib/fetch";
import { format } from "@/lib/utils";

import { Card } from "./card";

async function Price({ id }: { id: number }) {
  const price = await getPrice(id);

  return <>${format(price)}</>;
}

export default function Page() {
  return (
    <Card
      name="Bob"
      price={
        <Suspense fallback="...">
          <Price id={5} />
        </Suspense>
      }
    />
  );
}
