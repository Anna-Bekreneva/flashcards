import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { TabsTrigger, TabSwitcher } from '@/components'

const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes: {
    onValueChange: { description: '(value: string) => void ' },
  },
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>
export const TabSwitcherDefault = (args: Story) => {
  const [value, setValue] = useState('tab-1')
  const callback = (value: string) => {
    setValue(value)
    action(value)()
  }

  return (
    <TabSwitcher {...args} onValueChange={callback} value={value}>
      <TabsTrigger value={'tabs1'}>tab 1</TabsTrigger>
      <TabsTrigger value={'tabs2'}>tab 2</TabsTrigger>
      <TabsTrigger value={'tabs3'}>tab 3</TabsTrigger>
    </TabSwitcher>
  )
}
