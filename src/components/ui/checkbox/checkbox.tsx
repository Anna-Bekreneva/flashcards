import { ComponentPropsWithoutRef, ElementType, useState } from 'react'

import { Checkbox } from '@radix-ui/themes'

import s from './checkbox.module.scss'

export type CheckboxCustomProps = {
  id: string
  label?: string
  disabled: boolean
  checked: boolean
  callback: (checked: boolean) => void
} & ComponentPropsWithoutRef<ElementType>
export const CheckboxCustom = (
  props: CheckboxCustomProps &
    Omit<ComponentPropsWithoutRef<ElementType>, keyof CheckboxCustomProps>
) => {
  const { id, label, disabled, checked, callback, ...rest } = props

  const [isChecked, setIsChecked] = useState(checked)
  const changeHandler = (e: boolean) => setIsChecked(e)

  return (
    <div className={`${s.wrapper} ${disabled ? s.disabled : ''}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <Checkbox
        className={s.checkbox}
        id={id}
        checked={isChecked}
        disabled={disabled}
        onCheckedChange={changeHandler}
        {...rest}
      />
    </div>
  )
}
