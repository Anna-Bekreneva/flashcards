import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from '@/components/ui/tabSwitcher/tabSwitcher.tsx'
const items = [
  {
    value: 'tab-1',
    title: 'tab-1',
  },
  {
    value: 'tab-2',
    title: 'tab-2',
    disabled: true,
  },
  {
    value: 'tab-3',
    title: 'tab-3',
  },
]
const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes: {
    items: {
      defaultValue: items,
      description: '{value: string, title: string, disabled?: boolean}',
    },
    onValueChange: { description: '(value: string) => void ' },
  },
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>
export const TabSwitcherDefault = () => {
  const [value, setValue] = useState('tab-1')
  const callback = (value: string) => {
    setValue(value)
    action(value)()
  }

  return <TabSwitcher items={items} onValueChange={callback} value={value} />
}
