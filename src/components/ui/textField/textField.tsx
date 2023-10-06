import { ComponentProps, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import s from './textField.module.scss'

import { EyeOff } from '@/assets/iconsComponents/eye-off'
import { EyeOn } from '@/assets/iconsComponents/eye-on'
import { TypographyVariant } from '@/common/types/types.ts'
import { Typography } from '@/components/ui/typography'

export type TextFieldOwnProps = {
  label?: string
  errorMessage?: string
  onValueChange?: (value: string) => void
} & ComponentPropsWithoutRef<'input'>

type TextFieldProps = TextFieldOwnProps &
  Omit<ComponentPropsWithoutRef<'input'>, keyof TextFieldOwnProps>

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>((props, ref?) => {
  const { type, label, errorMessage, disabled, className, id, onValueChange, ...restProps } = props
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const isSearch = type === 'search'

  const wrapperClassName = `${isSearch && s.searchWrapper} ${errorMessage && s.errorWrapper} ${
    props.disabled && s.disabledWrapper
  } ${s.wrapper}`
  const finalType = getFinalType(type, showPassword)

  return (
    <>
      {label && (
        <Typography className={s.label} as={'label'} variant={TypographyVariant.body2} htmlFor={id}>
          {label}
        </Typography>
      )}
      <div className={wrapperClassName} ref={ref}>
        <input
          className={`${isSearch && s.searchField} ${s.field} `}
          id={id}
          type={isPassword ? finalType : type}
          disabled={disabled}
          onChange={e => onValueChange?.(e.target.value)}
          {...restProps}
        />{' '}
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
      {errorMessage && (
        <Typography className={s.errorMessage} variant={TypographyVariant.caption}>
          {errorMessage}
        </Typography>
      )}
    </>
  )
})

function getFinalType(type: ComponentProps<'input'>['type'], showPassword: boolean) {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}
