import { ChangeEvent, ComponentProps, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import s from './text-field.module.scss'

import { EyeOff } from '@/assets/icons/eye-off'
import { EyeOn } from '@/assets/icons/eye-on'
import { Search } from '@/assets/icons/search'
import { Typography } from '@/components/ui/typography'

export type TextFieldOwnProps = {
  type?: 'search' | 'text' | 'password'
  label?: string
  className?: string
  errorMsg?: string
  search?: boolean
  onValueChange?: (value: string) => void
} & ComponentPropsWithoutRef<'input'>

type TextFieldProps = TextFieldOwnProps &
  Omit<ComponentPropsWithoutRef<'input'>, keyof TextFieldOwnProps>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    type,
    label,
    errorMsg,
    placeholder,
    disabled,
    className,
    onValueChange,
    onChange,
    search,
    ...restProps
  } = props
  const [showPassword, setShowPassword] = useState(false)
  const isShowPasswordButton = type === 'password'

  const finalType = getFinalType(type, showPassword)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e)
    onValueChange?.(e.target.value)
  }

  return (
    <div className={s.mainContainer}>
      {label && (
        <Typography as={'label'} variant={'body2'} className={s.label}>
          {label}
        </Typography>
      )}
      <div className={s.textFieldWrapper}>
        {search && <Search />}
        <input
          className={s.textField}
          ref={ref}
          type={finalType}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          {...restProps}
        />
        {isShowPasswordButton && (
          <button type="button" onClick={() => setShowPassword(value => !value)}>
            {showPassword ? <EyeOff /> : <EyeOn />}
          </button>
        )}
      </div>
      <Typography variant="error" className={s.errorMsg}>
        {errorMsg}
      </Typography>
    </div>
  )
})

function getFinalType(type: ComponentProps<'input'>['type'], showPassword: boolean) {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}
