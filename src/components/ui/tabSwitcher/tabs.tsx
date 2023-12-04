import { ElementRef, forwardRef } from 'react'

import * as TabsRadix from '@radix-ui/react-tabs'
import { TabsContentProps, TabsListProps, TabsProps } from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

import { ButtonVariant } from '@/common'
import { Button, ButtonProps } from '@/components'

export const Tabs = forwardRef<ElementRef<typeof TabsRadix.Root>, TabsProps>(
  ({ value, onValueChange, ...props }, ref?) => {
    return (
      <TabsRadix.Root
        className={s.root}
        onValueChange={value => {
          onValueChange?.(value)
        }}
        value={value}
        ref={ref}
        {...props}
      />
    )
  }
)

export const TabsList = forwardRef<ElementRef<typeof TabsRadix.TabsList>, TabsListProps>(
  ({ className, ...props }, ref) => {
    return <TabsRadix.List className={`${s.list} ${className}`} ref={ref} {...props} />
  }
)

type TabsTriggerPropsType = {
  value: string
  disabled?: boolean
} & ButtonProps<'button'>
export const TabsTrigger = forwardRef<ElementRef<typeof TabsRadix.Trigger>, TabsTriggerPropsType>(
  ({ value, disabled, ...props }, ref?) => {
    return (
      <TabsRadix.Trigger ref={ref} value={value} asChild>
        <Button
          className={s.button}
          variant={ButtonVariant.tertiary}
          disabled={disabled}
          {...props}
        />
      </TabsRadix.Trigger>
    )
  }
)

export const TabsContent = forwardRef<ElementRef<typeof TabsRadix.Content>, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    return (
      <TabsRadix.Content
        className={`${s.content} ${className}`}
        value={value}
        ref={ref}
        {...props}
      />
    )
  }
)
