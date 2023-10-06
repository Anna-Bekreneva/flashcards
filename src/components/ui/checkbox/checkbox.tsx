import { forwardRef } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckboxProps } from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

import { TypographyVariant } from '@/common/types/types.ts'
import { Typography } from '@/components/ui/typography'

export type CheckboxCustomProps = {
  label?: string
} & CheckboxProps

export const CheckboxCustom = forwardRef<HTMLDivElement, CheckboxCustomProps>(
  ({ label, id, onCheckedChange, ...props }, ref?) => {
    const rootClassName = `${s.checkbox} ${props.checked ? s.checked : ''}`
    const wrapperClassName = `${s.wrapper} ${props.disabled ? s.disabled : ''}`

    return (
      <div className={wrapperClassName} ref={ref}>
        {label && (
          <Typography
            className={s.label}
            as={'label'}
            htmlFor={id}
            variant={TypographyVariant.body2}
          >
            {label}
          </Typography>
        )}
        <Checkbox.Root
          className={rootClassName}
          id={id}
          onCheckedChange={(checked: boolean) => onCheckedChange?.(checked)}
          {...props}
        >
          <Checkbox.Indicator className={s.indicator} aria-hidden />
        </Checkbox.Root>
      </div>
    )
  }
)
