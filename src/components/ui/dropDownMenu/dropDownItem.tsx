import { ElementRef, forwardRef } from 'react'

import * as RadixDropDownMenu from '@radix-ui/react-dropdown-menu'
import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

export type Props = DropdownMenuItemProps & {
  className?: string
}
export const DropDownItem = forwardRef<ElementRef<typeof RadixDropDownMenu.Item>, Props>(
  ({ className, children, ...props }, ref?) => {
    const itemClassName = `${s.item} ${className ? className : ''}`

    return (
      <RadixDropDownMenu.Item className={itemClassName} ref={ref} {...props}>
        {children}
      </RadixDropDownMenu.Item>
    )
  }
)
