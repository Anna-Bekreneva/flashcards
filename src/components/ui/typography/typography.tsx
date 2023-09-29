import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  forwardRef,
  ReactNode,
} from 'react'

import s from './typography.module.scss'

import { TypographyVariant } from '@/common/types/types.ts'

export type TypographyProps<T extends ElementType = 'p'> = {
  variant?: keyof typeof TypographyVariant
  as?: T
} & ComponentPropsWithoutRef<T>

const TypographyPolymorph = <T extends ElementType = 'p'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>,
  ref: ElementRef<T>
): ReactNode => {
  const { variant = TypographyVariant.body1, className, as: Tag = 'p', ...rest } = props

  return (
    // @ts-expect-error TS2322
    <Tag className={`${s[String(variant)]} ${s.typography} ${className}`} ref={ref} {...rest}></Tag>
  )
}

export const Typography = forwardRef(TypographyPolymorph) as <T extends ElementType = 'p'>(
  props: TypographyProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>> & {
      ref?: ForwardedRef<ElementRef<T>>
    }
) => ReturnType<typeof TypographyPolymorph>
