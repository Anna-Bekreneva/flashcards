import { ComponentPropsWithoutRef, ElementRef, ElementType, ForwardedRef, forwardRef } from 'react'

import s from './card.module.scss'

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
  variant?: 'dark' | 'light'
} & ComponentPropsWithoutRef<T>

const CardPolymorph = <T extends ElementType = 'div'>(
  props: CardProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>>,
  ref: ElementRef<T>
) => {
  const { variant = 'dark', as: Tag = 'div', ...rest } = props

  // @ts-ignore expected TS2322
  return <Tag className={`${s.card} ${s[variant]}`} ref={ref} {...rest}></Tag>
}

export const Card = forwardRef(CardPolymorph) as <T extends ElementType = 'div'>(
  props: CardProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>> & {
      ref?: ForwardedRef<ElementRef<T>>
    }
) => ReturnType<typeof CardPolymorph>
