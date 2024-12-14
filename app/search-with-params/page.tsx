import { SubmissionResult } from "@conform-to/react";
import { schema, search, SearchResult } from "./lib";
import { Search } from "./search";
import { Suspense } from "react";

type State = {
  lastResult: SubmissionResult | null;
  results: SearchResult[] | null;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { query = "" } = schema.parse(await searchParams);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Search results={search(query)} />
    </Suspense>
  );
}
