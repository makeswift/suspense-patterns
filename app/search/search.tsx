'use client'

import { startTransition, useActionState, useDeferredValue, useEffect, useState } from 'react'
import { Action, SearchResult } from './lib'
import { SearchResults } from './search-results'
import { SubmissionResult } from '@conform-to/react'

export function Search({
  searchAction,
}: {
  searchAction: Action<{ lastResult: SubmissionResult | null; results: SearchResult[] }, FormData>
}) {
  const [{ results }, formAction, isPending] = useActionState(searchAction, {
    lastResult: null,
    results: [],
  })
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    startTransition(async () => {
      const formData = new FormData()
      formData.append('query', deferredQuery)
      formAction(formData)
    })
  }, [deferredQuery])

  return (
    <div>
      <form action="/search/results">
        <input
          name="query"
          className="bg-slate-900"
          value={query}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
          onChange={(event) => {
            setQuery(event.target.value)
          }}
        />
        <button type="submit">Search</button>
        <div>
          {showResults && (
            <div>
              <SearchResults results={results} />
              {isPending && <div>Loading results for "{deferredQuery}"...</div>}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
