import { ComponentProps, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import s from './textField.module.scss'

import { EyeOff, EyeOn } from '@/assets/iconsComponents'
import { TypographyVariant } from '@/common'
import { Typography } from '@/components'

export type TextFieldOwnProps = {
  label?: string
  errorMessage?: string
  onValueChange?: (value: string) => void
  isShowErrorMessage?: boolean
} & ComponentPropsWithoutRef<'input'>

export type TextFieldProps = TextFieldOwnProps &
  Omit<ComponentPropsWithoutRef<'input'>, keyof TextFieldOwnProps>

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>((props, ref?) => {
  const {
    type,
    label,
    errorMessage,
    disabled,
    className,
    isShowErrorMessage = true,
    id,
    onValueChange,
    ...restProps
  } = props
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const isSearch = type === 'search'

  const wrapperClassName = `${isSearch ? s.searchWrapper : ''} ${
    errorMessage ? s.errorWrapper : ''
  } ${props.disabled ? s.disabledWrapper : ''} ${s.wrapper}`
  const inputClassName = `${isSearch ? s.searchField : ''} ${s.field}`
  const finalType = getFinalType(type, showPassword)

  return (
    <div className={props.className}>
      {label && (
        <Typography className={s.label} as={'label'} variant={TypographyVariant.body2} htmlFor={id}>
          {label}
        </Typography>
      )}
      <div className={wrapperClassName} ref={ref}>
        <input
          className={inputClassName}
          id={id}
          type={isPassword ? finalType : type}
          disabled={disabled}
          onChange={e => onValueChange?.(e.target.value)}
          {...restProps}
        />
        {isPassword && (
          <button
            type="button"
            className={s.showPassword}
            onClick={() => setShowPassword(value => !value)}
          >
            {showPassword ? <EyeOff /> : <EyeOn />}
          </button>
        )}
      </div>
      {isShowErrorMessage && errorMessage && (
        <Typography className={s.errorMessage} variant={TypographyVariant.caption}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
})

const getFinalType = (type: ComponentProps<'input'>['type'], showPassword: boolean) =>
  type === 'password' && showPassword ? 'text' : type
