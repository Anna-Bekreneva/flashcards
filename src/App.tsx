import Header from '@/components/ui/header/header.tsx'

export function App() {
  return (
    <div>
      Hello
      <div>
        <Header isLoggedIn={false} />
      </div>
      <div>
        <Header userName={'Ivan'} isLoggedIn={true} />
      </div>
    </div>
  )
}
