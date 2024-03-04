import { ElementRef, forwardRef, ReactNode } from 'react'

import * as RadixDropDownMenu from '@radix-ui/react-dropdown-menu'
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

type DropDownMenuPropsType = DropdownMenuContentProps & {
  trigger: ReactNode
  align?: 'center' | 'start' | 'end'
  className?: string
  open?: boolean
  onOpenChange?: (value: boolean) => void
}

export const DropDownMenu = forwardRef<
  ElementRef<typeof RadixDropDownMenu.Root>,
  DropDownMenuPropsType
>(({ className, align = 'center', trigger, open, onOpenChange, children, ...props }, ref?) => {
  const contentClassName = `${s.content} ${s[align]} ${className ? className : ''}`

  return (
    <RadixDropDownMenu.Root open={open} onOpenChange={onOpenChange}>
      <RadixDropDownMenu.Trigger asChild>{trigger}</RadixDropDownMenu.Trigger>
      {/*<RadixDropDownMenu.Portal>*/}
      <RadixDropDownMenu.Content className={contentClassName} align={align} ref={ref} {...props}>
        {children}
      </RadixDropDownMenu.Content>
      {/*</RadixDropDownMenu.Portal>*/}
    </RadixDropDownMenu.Root>
  )
})
