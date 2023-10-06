import { ElementRef, forwardRef } from 'react'

import * as Tabs from '@radix-ui/react-tabs'
import { TabsProps } from '@radix-ui/react-tabs'

import s from './tabSwitcher.module.scss'

import { Button } from '@/components/ui/button'

type Props = {
  items: ItemType[]
} & TabsProps

type ItemType = {
  value: string
  title: string
  disabled?: boolean
}

export const TabSwitcher = forwardRef<ElementRef<typeof Tabs.Root>, Props>(
  ({ items, value, onValueChange, ...props }, ref?) => {
    const tabsList = items.map(item => {
      const isActive = item.value === value

      return (
        <Tabs.Trigger key={item.value} value={item.value} disabled={item.disabled} asChild>
          <Button
            className={s.button}
            variant={isActive ? 'primary' : 'tertiary'}
            disabled={item.disabled}
          >
            {item.title}
          </Button>
        </Tabs.Trigger>
      )
    })

    return (
      <Tabs.Root
        className={s.root}
        onValueChange={value => {
          onValueChange?.(value)
        }}
        value={value}
        ref={ref}
        {...props}
      >
        <Tabs.List className={s.list} loop={true}>
          {tabsList}
        </Tabs.List>
      </Tabs.Root>
    )
  }
)
