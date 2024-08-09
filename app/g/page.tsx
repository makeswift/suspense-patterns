import { Search } from "./search"

async function findResults(query: string): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["a", "b", "c"])
    }, 1000)
  })
}

async function action(query: string): Promise<string[]> {
  "use server"

  return findResults(query)
}

export default function Page() {
  return <Search action={action} />
}
