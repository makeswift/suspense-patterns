export const dynamic = "force-dynamic";

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  throw new Error("Boom!");
}
