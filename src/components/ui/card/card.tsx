import { ComponentPropsWithoutRef, ReactNode } from 'react'

import s from './card.module.scss'

export type CardProps = {
  children?: ReactNode
  variant?: 'dark' | 'light'
} & ComponentPropsWithoutRef<'div'>

export const Card = ({ children, variant = 'dark', ...rest }: CardProps) => {
  return (
    <div className={`${s.card} ${s[variant]}`} {...rest}>
      {children}
    </div>
  )
}
