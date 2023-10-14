import { ElementRef, forwardRef, ReactNode } from 'react'

import * as RadixDropDownMenu from '@radix-ui/react-dropdown-menu'
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

type DropDownMenuPropsType = DropdownMenuProps & {
  trigger: ReactNode
  align?: 'center' | 'start' | 'end'
  className?: string
}

export const DropDownMenu = forwardRef<
  ElementRef<typeof RadixDropDownMenu.Content>,
  DropDownMenuPropsType
>(({ className, align = 'center', trigger, children }, ref?) => {
  const contentClassName = `${s.content} ${s[align]} ${className ? className : ''}`

  return (
    <RadixDropDownMenu.Root>
      <RadixDropDownMenu.Trigger>{trigger}</RadixDropDownMenu.Trigger>
      {/*<RadixDropDownMenu.Portal>*/}
      <RadixDropDownMenu.Content className={contentClassName} align={align} ref={ref}>
        {children}
      </RadixDropDownMenu.Content>
      {/*</RadixDropDownMenu.Portal>*/}
    </RadixDropDownMenu.Root>
  )
})
