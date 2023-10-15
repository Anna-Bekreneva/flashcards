import { forwardRef } from 'react'

import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { RadioGroupItemProps } from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

import { TypographyVariant } from '@/common/types/types.ts'
import { Typography } from '@/components/ui/typography'

type Props = RadioGroupItemProps & {
  label: string
}

export const RadioItem = forwardRef<HTMLLabelElement, Props>(
  ({ value, disabled, label, ...props }, ref?) => {
    const innerClassName = `${s.inner} ${disabled ? s.disabled : ''}`

    return (
      <label className={innerClassName} ref={ref}>
        <RadixRadioGroup.Item
          className={`${s.radio} ${value === value ? s.active : ''} `}
          value={value}
          disabled={disabled}
          {...props}
        />
        <Typography className={s.name} as={'span'} variant={TypographyVariant.body2}>
          {label}
        </Typography>
      </label>
    )
  }
)
