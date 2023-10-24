import { forwardRef } from 'react'

import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { RadioGroupItemProps } from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

import { TypographyVariant } from '@/common/types/types.ts'
import { Typography } from '@/components/ui/typography'

type Props = {
  label: string
} & Omit<RadioGroupItemProps, 'id'>

export const RadioItem = forwardRef<HTMLDivElement, Props>(
  ({ value, label, disabled, ...props }, ref?) => {
    const innerClassName = `${s.inner} ${disabled ? s.disabled : ''}`

    return (
      <div className={innerClassName} ref={ref}>
        <RadixRadioGroup.Item
          className={`${s.radio} ${value === value ? s.active : ''} `}
          value={value}
          disabled={disabled}
          id={value}
          {...props}
        />
        <Typography
          className={s.name}
          as={'label'}
          variant={TypographyVariant.body2}
          htmlFor={value}
        >
          {label}
        </Typography>
      </div>
    )
  }
)
