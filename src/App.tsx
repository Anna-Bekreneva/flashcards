import { Pagination } from '@/components/ui/pagination'

const options = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '30', value: '30' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
]
const onPageChanged = (pageNumber: number, pageSize: number) => {
  console.log('fetching data for page: ', pageNumber, 'pageSize: ', pageSize)
}

const data = new Array(300)

export function App() {
  return (
    <div>
      Hello
      <Pagination data={data} callback={onPageChanged} optionsForSelect={options} />
    </div>
  )
}
