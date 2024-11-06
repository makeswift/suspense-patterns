import { z } from 'zod'

export async function search(query: string): Promise<SearchResult[]> {
  if (query === '') return []

  return [
    { id: 1, title: 'First result' },
    { id: 2, title: 'Second result' },
  ].filter((result) => result.title.toLowerCase().includes(query.toLowerCase()))
}

export type Action<State, Payload> = (
  state: Awaited<State>,
  payload: Payload,
) => State | Promise<State>

export type SearchResult = { id: number; title: string }

export type SearchParams = { [key: string]: string | string[] | undefined }

export const schema = z.object({
  query: z.string().optional(),
})
