import { Action, Form } from "./form";
import { SubmitButton } from "./submit-button";

interface Props {
  action: Action;
}

export function Search({ action }: Props) {
  return (
    <Form action={action}>
      <label htmlFor="query">Search</label>
      <input className="text-black" id="query" type="text" name="query" />
      <SubmitButton name="intent" value="search" />
    </Form>
  );
}
