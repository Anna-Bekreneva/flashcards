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
  triggerIMG: string
  alignType: 'center' | 'start' | 'end'
}

export const DropDownMenu: FC<DropDownMenuPropsType> = ({
  items,
  onItemSelect,
  alignType,
  triggerIMG,
}) => {
  const mappedItems = items.map((el, index) => {
    return (
      <DropdownMenu.Item onSelect={onItemSelect} key={index} className={s.item}>
        <span className={s.icon}>{el.icon}</span>
        <span className={s.itemValues}>
          {el.value}
          <br />
          {el.extraValue && <span className={s.extraValue}>{el.extraValue}</span>}
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
