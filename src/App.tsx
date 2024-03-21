import { Preloader } from '@/components'
import { Router } from '@/router.tsx'
import { useMeQuery } from '@/services'

export function App() {
  const { isLoading } = useMeQuery()

  if (isLoading) {
    return <Preloader />
  }

  return <Router />
}
