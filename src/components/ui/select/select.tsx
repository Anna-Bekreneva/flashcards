import { FC, useState } from 'react'

import * as Select from '@radix-ui/react-select'
import { SelectProps } from '@radix-ui/react-select'

import s from './select.module.scss'

type OptionType = { label: string; value: string; disabled?: boolean }

type SelectCustomProps = SelectProps & {
  items: OptionType[]
  callback?: (value: string) => void
}

export const SelectCustom: FC<SelectCustomProps> = ({ items, callback, disabled }) => {
  const [label, setLabel] = useState(items[0].label)
  const [isOpen, setIsOpen] = useState(false)
  const onValueChangeHandler = (value: string) => {
    setLabel(value)
    if (callback) {
      callback(value)
    }
  }

  const selectItems = items.map((el, index) => {
    return (
      <Select.Item value={el.label} key={index} className={s.selectItem}>
        <Select.ItemText>{el.value}</Select.ItemText>
      </Select.Item>
    )
  })

  return (
    <div className={s.wrapper}>
      <Select.Root
        value={label}
        onValueChange={onValueChangeHandler}
        onOpenChange={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <Select.Trigger className={`${s.selectTrigger} ${disabled ? s.disabled : ''}`}>
          <Select.Value aria-label={label}>{label}</Select.Value>
          <Select.Icon className={`${s.selectIcon} ${isOpen ? s.arrowUp : s.arrowDown}`} />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content position="popper" align={'center'} className={s.selectContent}>
            <Select.Viewport className={s.selectViewport}>{selectItems}</Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
