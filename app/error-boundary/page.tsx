import { ErrorBoundary } from 'react-error-boundary'

export default function Page() {
  return (
    <ErrorBoundary fallback={<div>An error has occurred!</div>}>
      <Boom />
    </ErrorBoundary>
  )
}

function Boom(): JSX.Element {
  throw new Error('Boom!')
}
