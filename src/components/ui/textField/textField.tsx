import { ComponentPropsWithoutRef, forwardRef } from 'react'

import s from './textField.module.scss'

import { EyeOff, EyeOn } from '@/assets/iconsComponents'
import { TypographyVariant } from '@/common'
import { Typography, useTextField } from '@/components'

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
  const { showPassword, setShowPassword, isPassword, wrapperClassName, inputClassName, finalType } =
    useTextField({ type, disabled, errorMessage })

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
