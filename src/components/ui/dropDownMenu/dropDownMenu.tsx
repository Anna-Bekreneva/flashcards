import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

export type ItemType = {
  icon: ReactNode
  value: string
  extraValue?: string
}

type DropDownMenuPropsType = DropdownMenuProps & {
  items: ItemType[]
  onItemSelect?: (event: Event) => void
  triggerIMG: string
  alignType: 'center' | 'start' | 'end'
} & ComponentPropsWithoutRef<'div'>

export const DropDownMenu = forwardRef<HTMLDivElement, DropDownMenuPropsType>(
  ({ items, onItemSelect, alignType, triggerIMG }, ref) => {
    const mappedItems = items.map((el, index) => {
      return (
        <DropdownMenu.Item onSelect={onItemSelect} key={index} className={s.item} ref={ref}>
          <span className={s.icon}>{el.icon}</span>
          <span className={s.itemValues}>
            {el.value}
            {el.extraValue && <span className={s.extraValue}>{el.extraValue}</span>}
          </span>
        </DropdownMenu.Item>
      )
    })

    const contentExtraClassName =
      // eslint-disable-next-line no-nested-ternary
      alignType === 'end' ? s.end : alignType === 'center' ? s.center : s.start

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>{<img src={triggerIMG} className={s.icon} />}</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={`${s.contentMenu} ${contentExtraClassName}`}
            onCloseAutoFocus={e => {
              e.preventDefault()
            }}
            align={alignType}
          >
            {mappedItems}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }
)
