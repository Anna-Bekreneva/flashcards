import { FC, useState } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { RadioGroupItemProps, RadioGroupProps } from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type RadioGroupCustomProps = {
  items: RadioButtonType[]
  defaultValue: string
  root?: RadioGroupProps
  callback: (value: string) => void
}

type RadioButtonType = {
  radioButton: RadioGroupItemProps
  label: string
}

export const RadioGroupCustom: FC<RadioGroupCustomProps> = ({
  items,
  defaultValue,
  root,
  callback,
}) => {
  const [value, setValue] = useState(defaultValue)

  const radioItems =
    items.length &&
    items.map((item, index) => {
      const clickHandler = () => {
        const newValue = item.radioButton.value

        setValue(newValue)
        callback(newValue)
      }

      return (
        <label className={`${s.inner} ${item.radioButton.disabled ? s.disabled : ''}`} key={index}>
          <RadioGroup.Item
            className={`${s.radio} ${value === item.radioButton.value ? s.active : ''} `}
            {...item.radioButton}
            value={value}
            disabled={item.radioButton.disabled}
            onClick={clickHandler}
          />
          <span className={s.name}>{item.label}</span>
        </label>
      )
    })

  return (
    <RadioGroup.Root className={`${s.root} ${root?.disabled ? s.disabled : ''}`} {...root}>
      {radioItems}
    </RadioGroup.Root>
  )
}
