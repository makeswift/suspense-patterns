import { Suspense } from "react";

import { getPrice } from "@/lib/fetch";
import { format } from "@/lib/utils";

import { Card, CardName, CardPrice } from "./card";

async function Price({ id }: { id: number }) {
  const price = await getPrice(id);

  return <>${format(price)}</>;
}

export default function Page() {
  return (
    <Card>
      <CardName>Bob</CardName>
      <Suspense fallback="...">
        <CardPrice>
          <Price id={5} />
        </CardPrice>
      </Suspense>
    </Card>
  );
}
