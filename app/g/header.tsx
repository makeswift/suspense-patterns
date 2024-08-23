import { Action } from "./form"
import { Search } from "./search"

export type { Action }

interface Props {
  action: Action
}

export function Header({ action }: Props) {
  return (
    <div className="flex justify-between p-4 items-center">
      Header
      <Search action={action} />
    </div>
  )
}
