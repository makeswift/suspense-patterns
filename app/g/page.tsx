import { State, Header } from "./header"

async function findResults(query: string): Promise<State> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        hasMore: true,
        results: ["a", "b", "c"],
      })
    }, 1000)
  })
}

async function action(prevState: State, formData: FormData): Promise<State> {
  "use server"

  const query = formData.get("query") as string
  const intent = formData.get("intent") as string

  console.log({ query, intent })

  return findResults(query)
}

export default function Page() {
  return <Header action={action} />
}
