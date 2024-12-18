import { MessagesForm } from "./messages-form";

export default function Page() {
  const initialMessages = ["Hello, world!"];

  return (
    <MessagesForm
      initialMessages={initialMessages}
      action={async function sendMessage(
        messages: string[],
        formData: FormData,
      ) {
        "use server";

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return [...messages, formData.get("message") as string];
      }}
    />
  );
}
