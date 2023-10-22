import { forwardRef } from 'react'

import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckboxProps } from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

import { TypographyVariant } from '@/common/types/types.ts'
import { Typography } from '@/components/ui/typography'

export type CheckboxCustomProps = {
  label?: string
  className?: string
} & CheckboxProps

export const Checkbox = forwardRef<HTMLDivElement, CheckboxCustomProps>(
  ({ label, className, id, onCheckedChange, ...props }, ref?) => {
    const rootClassName = `${s.checkbox} ${props.checked ? s.checked : ''}`
    const wrapperClassName = `${s.wrapper} ${props.disabled ? s.disabled : ''} ${
      className ? className : ''
    }`

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
        <RadixCheckbox.Root
          className={rootClassName}
          id={id}
          onCheckedChange={(checked: boolean) => onCheckedChange?.(checked)}
          {...props}
        >
          <RadixCheckbox.Indicator className={s.indicator} aria-hidden />
        </RadixCheckbox.Root>
      </div>
    )
  }
)
