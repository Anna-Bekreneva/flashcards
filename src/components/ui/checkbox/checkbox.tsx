import { FC, useState } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckboxProps, CheckedState } from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

export type CheckboxCustomProps = Omit<CheckboxProps, 'onCheckedChange'> & {
  label?: string
  value: string
  onCheckedChange: (value: string) => void
}

export const CheckboxCustom: FC<CheckboxCustomProps> = props => {
  const [checked, setChecked] = useState(props.defaultChecked)
  const rootClassName = `${s.checkbox} ${checked ? s.checked : ''}`

  const wrapperClassName = `${s.wrapper} ${props.disabled ? s.disabled : ''}`

  const onCheckedChange = (e: CheckedState) => {
    setChecked(!!e)
    props.onCheckedChange && props.onCheckedChange(props.value)
  }

  return (
    <div className={wrapperClassName}>
      {props.label && (
        <label className={s.label} htmlFor={props.id}>
          {props.label}
        </label>
      )}
      <Checkbox.Root
        className={rootClassName}
        id={props.id}
        checked={checked}
        {...props}
        value={props.value}
        onCheckedChange={onCheckedChange}
      >
        <Checkbox.Indicator />
      </Checkbox.Root>
    </div>
  )
}
