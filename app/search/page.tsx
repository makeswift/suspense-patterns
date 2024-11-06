import { SubmissionResult } from '@conform-to/react'
import { schema, search, SearchResult } from './lib'
import { Search } from './search'
import { parseWithZod } from '@conform-to/zod'

type State = { lastResult: SubmissionResult | null; results: SearchResult[] }

export default async function Page() {
  return (
    <Search
      searchAction={async (state: State, formData: FormData) => {
        'use server'

        const submission = parseWithZod(formData, { schema })

        if (submission.status !== 'success') {
          return { lastResult: submission.reply(), results: state.results }
        }

        const { query } = submission.value

        const results = await search(query ?? '')

        return { lastResult: submission.reply({ resetForm: true }), results }
      }}
    />
  )
}
