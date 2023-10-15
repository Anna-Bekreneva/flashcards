import { ElementRef, forwardRef, ReactNode } from 'react'

import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { RadioGroupProps } from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type Props = RadioGroupProps & {
  className?: string
  children: ReactNode
}

export const RadioGroup = forwardRef<ElementRef<typeof RadixRadioGroup.Root>, Props>(
  ({ children, className, ...props }, ref?) => {
    const rootClassName = `${s.root} ${className ? className : ''}`

    return (
      <RadixRadioGroup.Root className={rootClassName} ref={ref} {...props}>
        {children}
      </RadixRadioGroup.Root>
    )
  }
)
