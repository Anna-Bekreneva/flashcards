import { SelectCustom } from '@/components/ui/select'

export function App() {
  const items = [
    { label: 'lab1', value: 'val1' },
    { label: 'lab2', value: 'val2' },
    { label: 'lab3', value: 'val3', disabled: true },
  ]

  const callback = (value: string) => {
    console.log(value)
  }

  return (
    <div>
      Hello
      <div style={{ margin: '100px' }}>
        <SelectCustom items={items} callback={callback} disabled={true} />
      </div>
    </div>
  )
}
