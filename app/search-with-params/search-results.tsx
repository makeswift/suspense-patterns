import { SearchResult } from './lib'

export function SearchResults({ results }: { results: SearchResult[] }) {
  if (results.length === 0) return <p>No results</p>

  return (
    <ul>
      {results.map((result) => (
        <li key={result.id}>{result.title}</li>
      ))}
    </ul>
  )
}
