import { ElementRef, forwardRef } from 'react'

import * as Tabs from '@radix-ui/react-tabs'
import { TabsProps } from '@radix-ui/react-tabs'

import s from './tabSwitcher.module.scss'

import { Button, ButtonProps } from '@/components'

export const TabSwitcher = forwardRef<ElementRef<typeof Tabs.Root>, TabsProps>(
  ({ value, onValueChange, ...props }, ref?) => {
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
          {props.children}
        </Tabs.List>
      </Tabs.Root>
    )
  }
)

type TabsTriggerPropsType = {
  value: string
  disabled?: boolean
  children: string
} & ButtonProps<'button'>
export const TabsTrigger = forwardRef<ElementRef<typeof Tabs.Trigger>, TabsTriggerPropsType>(
  ({ value, children, disabled, ...props }, ref?) => {
    return (
      <Tabs.Trigger ref={ref} value={value} disabled={disabled} asChild>
        <Button className={s.button} disabled={disabled} {...props}>
          {children}
        </Button>
      </Tabs.Trigger>
    )
  }
)
