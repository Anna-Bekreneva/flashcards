import { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from '@/components/ui/tabSwitcher/tabSwitcher.tsx'

const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

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

const callback = (value: string) => console.log(value)

export const TabSwitcherDefault: Story = {
  args: {
    items,
    callback,
    defaultValue: 'tab-1',
  },
}
