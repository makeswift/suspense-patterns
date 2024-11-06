'use client'

import { startTransition, useActionState, useDeferredValue, useEffect, useState } from 'react'
import { Action, SearchResult } from './lib'
import { SearchResults } from './search-results'
import { SubmissionResult } from '@conform-to/react'

export function Search({
  searchAction,
}: {
  searchAction: Action<
    { lastResult: SubmissionResult | null; results: SearchResult[] | null },
    FormData
  >
}) {
  const [{ results }, formAction, isPending] = useActionState(searchAction, {
    lastResult: null,
    results: null,
  })
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    if (deferredQuery === '') return

    startTransition(async () => {
      const formData = new FormData()
      formData.append('query', deferredQuery)
      formAction(formData)
      console.log({ deferredQuery })
    })
  }, [deferredQuery])

  return (
    <div>
      <form action="/search/results">
        <input
          name="query"
          className="bg-slate-900"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
          }}
        />
        <button type="submit">Search</button>
        <div>
          {results && <SearchResults results={results} />}
          {isPending && <div>Loading...</div>}
        </div>
      </form>
    </div>
  )
}
