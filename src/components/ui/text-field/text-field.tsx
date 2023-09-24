import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'

import s from './text-field.module.scss'

import { Typography } from '@/components/ui/typography'

export type TextFieldOwnProps = {
  type?: 'search' | 'text' | 'password'
  label?: string
  className?: string
  errorMsg?: string
  leftSideIcon?: ReactNode
  rightSideIcon?: ReactNode
  onClearField?: () => void
  onLeftSideIconClickHandler?: () => void
  onRightSideIconClickHandler?: () => void
} & ComponentPropsWithoutRef<'input'>

type TextFieldProps = TextFieldOwnProps &
  Omit<ComponentPropsWithoutRef<'input'>, keyof TextFieldOwnProps>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    type,
    value,
    label,
    errorMsg,
    placeholder,
    disabled,
    className,
    leftSideIcon,
    rightSideIcon,
    ...restProps
  } = props

  return (
    <div className={s.main}>
      {
        <Typography as={'label'} variant={'body2'}>
          {label}
        </Typography>
      }
      <div className={s.textFieldWrapper}>
        <input ref={ref} value={value} placeholder={placeholder} disabled={disabled} />
        <Icon icon={leftSideIcon} className={''} />
      </div>
    </div>
  )
})

type IconProps = {
  icon: ReactNode
  className: string
  onClick?: () => void
}

const Icon = ({ icon, className, onClick }: IconProps) => {
  if (!icon) {
    return null
  }

  return (
    <div className={className} onClick={onClick}>
      {icon}
    </div>
  )
}
