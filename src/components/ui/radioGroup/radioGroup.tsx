import { ElementRef, forwardRef } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { RadioGroupProps } from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

import { TypographyVariant } from '@/common/types/types.ts'
import { Typography } from '@/components/ui/typography'

type Props = {
  items: RadioButtonType[]
} & RadioGroupProps

type RadioButtonType = {
  value: string
  disabled?: boolean
  label: string
}

export const RadioGroupCustom = forwardRef<ElementRef<typeof RadioGroup.Root>, Props>(
  ({ items, ...props }, ref?) => {
    const radioItems =
      items.length &&
      items.map((item, index) => {
        return (
          <label className={`${s.inner} ${item.disabled ? s.disabled : ''}`} key={index}>
            <RadioGroup.Item
              className={`${s.radio} ${props.value === item.value ? s.active : ''} `}
              value={item.value}
              disabled={item.disabled}
            />
            <Typography className={s.name} as={'span'} variant={TypographyVariant.body2}>
              {item.label}
            </Typography>
          </label>
        )
      })

    return (
      <RadioGroup.Root className={s.root} ref={ref} {...props}>
        {radioItems}
      </RadioGroup.Root>
    )
  }
)
