import { Button } from '@/components/ui/button'
import { TabSwitcher } from '@/components/ui/tabSwitcher'

export function App() {
  const changeTabValueHandler = (value: string) => console.log(value)

  const items = [
    {
      value: 'tab-1',
      triggerText: 'tab-1',
      content: <div>text 1</div>,
    },
    {
      value: 'tab-2',
      triggerText: 'tab-2',
      content: <div>text 2</div>,
      disabled: true,
    },
  ]

  return (
    <>
      <div>Hello</div>
      <Button variant={'tertiary'}>123</Button>
      <TabSwitcher defaultValue={'tab-1'} items={items} callback={changeTabValueHandler} />
    </>
  )
}
