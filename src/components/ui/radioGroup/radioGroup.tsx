import { ElementRef, forwardRef, ReactNode } from 'react'

import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { RadioGroupProps } from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

import { TypographyVariant } from '@/common'
import { Typography } from '@/components'

export type CustomRadioGroupProps = RadioGroupProps & {
  className?: string
  children: ReactNode
  errorMessage?: string
}

export const RadioGroup = forwardRef<
  ElementRef<typeof RadixRadioGroup.Root>,
  CustomRadioGroupProps
>(({ children, errorMessage, className, ...props }, ref?) => {
  const rootClassName = `${s.root} ${className ? className : ''}`

  return (
    <RadixRadioGroup.Root className={rootClassName} ref={ref} {...props}>
      {children}
      {errorMessage && (
        <Typography className={s.errorMessage} variant={TypographyVariant.caption}>
          {errorMessage}
        </Typography>
      )}
    </RadixRadioGroup.Root>
  )
})
