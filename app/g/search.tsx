"use client"

import { useState } from "react"

interface Props {
  action: (query: string) => Promise<string[]>
}

export function Search({ action }: Props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<string[]>([])

  return (
    <div>
      <label htmlFor="query">Search</label>
      <input
        className="text-black"
        id="query"
        type="text"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <button
        type="submit"
        className="bg-violet text-white p-2 rounded-lg"
        onClick={async () => {
          const data = await action(query)

          setResults(data)
        }}
      >
        Submit
      </button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  )
}
