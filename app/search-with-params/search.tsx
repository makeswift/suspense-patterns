'use client'

import Form from 'next/form'
import { use, useState, useTransition } from 'react'
import { SearchResult } from './lib'
import { SearchResults } from './search-results'

export function Search({ results }: { results: SearchResult[] | Promise<SearchResult[]> }) {
  const [isPending, startTransition] = useTransition()
  results = results instanceof Promise ? use(results) : results
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)

  return (
    <div>
      <Form action="">
        <input
          name="query"
          className="bg-slate-900"
          onFocus={() => {
            setShowResults(true)
          }}
          onBlur={() => {
            setShowResults(false)
          }}
          value={query}
          onChange={(event) => {
            setQuery(event.currentTarget.value)

            startTransition(() => {
              event.currentTarget.form?.requestSubmit()
            })
          }}
        />
        <button formAction="/search-with-params/results" type="submit">
          Search
        </button>
        <div>
          {showResults && (
            <div>
              <SearchResults results={results} />
              {isPending && <div>Loading results for "{query}"...</div>}
            </div>
          )}
        </div>
      </Form>
    </div>
  )
}
