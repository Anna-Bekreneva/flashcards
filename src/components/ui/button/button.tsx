import { ComponentPropsWithoutRef, ElementRef, ElementType, ForwardedRef, forwardRef } from 'react'

import s from './button.module.scss'

import { ButtonVariant } from '@/common'

export type ButtonProps<T extends ElementType> = {
  as?: T
  variant?: keyof typeof ButtonVariant
  fullWidth?: boolean
  disabled?: boolean
} & ComponentPropsWithoutRef<T>
const ButtonPolymorph = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
  ref: ElementRef<T>
) => {
  const {
    variant = ButtonVariant.primary,
    fullWidth,
    className,
    as: Tag = 'button',
    ...rest
  } = props

  return (
    // @ts-expect-error TS2322
    <Tag
      className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
      disabled={props.disabled}
      ref={ref}
      {...rest}
    />
  )
}

export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType = 'button'>(
  props: ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>> & {
      ref?: ForwardedRef<ElementRef<T>>
    }
) => ReturnType<typeof ButtonPolymorph>
