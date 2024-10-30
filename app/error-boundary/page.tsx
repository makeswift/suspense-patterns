import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export default function Page() {
  return (
    <ErrorBoundary fallback={<div>An error has occurred!</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <Boom />
      </Suspense>
    </ErrorBoundary>
  )
}

async function Boom(): Promise<JSX.Element> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  throw new Error('Boom!')
}
