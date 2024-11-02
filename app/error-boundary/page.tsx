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

export const dynamic = 'force-dynamic'

async function Boom(): Promise<React.ReactElement> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  throw new Error('Boom!')
}
