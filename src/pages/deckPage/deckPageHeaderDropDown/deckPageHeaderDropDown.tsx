import { useState } from 'react'

import { NavLink } from 'react-router-dom'

import { DeleteIcon, EditIcon, PlayIcon } from '@/assets/iconsComponents'
import { DropDownMenu } from '@/components'
import s from '@/pages/deckPage/deckPage.module.scss'

type DeckPageHeaderDropDownProps = {
  deckId: string
  learn: boolean
  disabled?: boolean
  deleteCallBack: () => void
  editCallBack: () => void
}
export const DeckPageHeaderDropDown = ({
  deckId,
  deleteCallBack,
  editCallBack,
  disabled = false,
  learn,
}: DeckPageHeaderDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropDownMenu
      open={isOpen}
      onOpenChange={setIsOpen}
      className={s.dropdown}
      trigger={<button className={s.trigger} aria-label={'manage deck'} />}
    >
      <ul>
        {learn && (
          <li className={s.dropdownItem}>
            <NavLink className={s.dropdownAction} to={`/decks/deck/cards/${deckId}`}>
              <PlayIcon width={16} height={16} /> Learn
            </NavLink>
          </li>
        )}
        <li className={s.dropdownItem}>
          <button
            className={s.dropdownAction}
            onClick={() => {
              editCallBack()
              setIsOpen(false)
            }}
            disabled={disabled}
          >
            <EditIcon width={16} height={16} /> Edit
          </button>
        </li>
        <li className={s.dropdownItem}>
          <button
            className={s.dropdownAction}
            onClick={() => {
              deleteCallBack()
              setIsOpen(false)
            }}
            disabled={disabled}
          >
            <DeleteIcon width={16} height={16} /> Delete
          </button>
        </li>
      </ul>
    </DropDownMenu>
  )
}
