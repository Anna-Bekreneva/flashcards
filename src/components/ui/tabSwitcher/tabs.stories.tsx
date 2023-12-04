import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { TabsTrigger, Tabs, TabsList, TabsContent } from '@/components'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    onValueChange: { description: '(value: string) => void ' },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const TabsVariant = {
  tab1: 'tab-1',
  tab2: 'tab-2',
  tab3: 'tab-3',
} as const

type TabsValueType = (typeof TabsVariant)[keyof typeof TabsVariant]

export const TabsDefault = (args: Story) => {
  const [value, setValue] = useState<TabsValueType>(TabsVariant.tab1)
  const callback = (value: TabsValueType) => {
    setValue(value)
    action(value)()
  }

  return (
    <Tabs {...args} onValueChange={value => callback(value as TabsValueType)} value={value}>
      <TabsList>
        <TabsTrigger value={TabsVariant.tab1} type={'button'}>
          button 1
        </TabsTrigger>
        <TabsTrigger value={TabsVariant.tab2} type={'button'}>
          button 2
        </TabsTrigger>
        <TabsTrigger value={TabsVariant.tab3} type={'button'}>
          button 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value={TabsVariant.tab1}> content 1 </TabsContent>
      <TabsContent value={TabsVariant.tab2}> content 2 </TabsContent>
      <TabsContent value={TabsVariant.tab3}> content 3 </TabsContent>
    </Tabs>
  )
}

export const TabsWithoutContent = (args: Story) => {
  const [value, setValue] = useState<TabsValueType>(TabsVariant.tab1)
  const callback = (value: TabsValueType) => {
    setValue(value)
    action(value)()
  }

  return (
    <Tabs {...args} onValueChange={value => callback(value as TabsValueType)} value={value}>
      <TabsList>
        <TabsTrigger value={TabsVariant.tab1} type={'button'}>
          button 1
        </TabsTrigger>
        <TabsTrigger value={TabsVariant.tab2} type={'button'}>
          button 2
        </TabsTrigger>
        <TabsTrigger value={TabsVariant.tab3} type={'button'}>
          button 3
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
