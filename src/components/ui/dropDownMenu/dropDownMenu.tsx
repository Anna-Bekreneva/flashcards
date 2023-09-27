import { FC, ReactNode } from 'react'

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
}

export const DropDownMenu: FC<DropDownMenuPropsType> = ({ children, items, onItemSelect }) => {
  const mappedItems = items.map((el, index) => {
    return (
      <DropdownMenu.Item onSelect={onItemSelect} key={index} className={s.item}>
        <span>{el.icon}</span>
        <span className={s.itemValues}>
          {el.value}
          <br />
          {el.extraValue && <span className={s.extraValue}>{el.extraValue}</span>}
          {/*<span className={s.extraValue}>{el.extraValue}</span>*/}
        </span>
        <DropdownMenu.Separator
          className={
            index === items.length - 1
              ? `${s.DropdownMenuSeparator} ${s.notDisplayed}`
              : s.DropdownMenuSeparator
          }
        />
      </DropdownMenu.Item>
    )
  })

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={s.contentMenu}
          onCloseAutoFocus={e => {
            e.preventDefault()
          }}
          align={'end'}
        >
          {mappedItems}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
