import { search, SearchParams } from '../lib'
import { SearchResults } from '../search-results'

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { query } = await searchParams

  if (typeof query !== 'string') throw new Error('Invalid query')

  const results = await search(query)

  return <SearchResults results={results} />
}
