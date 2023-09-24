import { FC, ReactNode, useState } from 'react'

import * as Tabs from '@radix-ui/react-tabs'

import s from './tabSwitcher.module.scss'

import { Button } from '@/components/ui/button'

type Props = {
  defaultValue: string
  callback: (value: string) => void
  items: ItemType[]
}

type ItemType = {
  value: string
  triggerText: string
  content: ReactNode
  disabled?: boolean
}
export const TabSwitcher: FC<Props> = ({ defaultValue, callback, items }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  const changeActiveTabHandler = (value: string) => {
    setActiveTab(value)
    callback(value)
  }

  const tabsList = items.map(item => {
    const isActive = item.value === activeTab

    return (
      <Tabs.Trigger key={item.value} value={item.value} disabled={item.disabled}>
        <Button
          className={`${isActive ? s.active + ' ' + s.button : s.button}`}
          variant={isActive ? 'primary' : 'tertiary'}
          disabled={item.disabled}
        >
          {' '}
          {item.triggerText}{' '}
        </Button>
      </Tabs.Trigger>
    )
  })

  const tabsContent = items.map(item => {
    return (
      <Tabs.Content className={s.content} key={item.value} value={item.value}>
        {item.content}
      </Tabs.Content>
    )
  })

  return (
    <Tabs.Root
      className={s.root}
      defaultValue={defaultValue}
      value={activeTab}
      onValueChange={changeActiveTabHandler}
    >
      <Tabs.List className={s.list}>{tabsList}</Tabs.List>
      {tabsContent}
    </Tabs.Root>
  )
}
