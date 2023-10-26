import { forwardRef } from 'react'

import * as RadixSelect from '@radix-ui/react-select'
import { SelectProps } from '@radix-ui/react-select'

import s from './select.module.scss'

import { TypographyVariant } from '@/common'
import { Typography } from '@/components'

type OptionType = { label: string; value: string; disabled?: boolean }

type Props = SelectProps & {
  label?: string
  id?: string
  items: OptionType[]
  className?: string
}

export const Select = forwardRef<HTMLDivElement, Props>(
  ({ label, items, id, value, ...props }, ref?) => {
    const selectItems = items.map((el, index) => {
      return (
        <RadixSelect.Item value={el.value} key={index} className={s.item}>
          <RadixSelect.ItemText>{el.label}</RadixSelect.ItemText>
        </RadixSelect.Item>
      )
    })

    const currentItem = items.find(item => item.value === value)
    const wrapperClassName = `${s.wrapper} ${props.disabled ? s.disabled : ''}${
      props.className && props.className
    }`

    return (
      <div className={wrapperClassName} ref={ref}>
        {label && (
          <Typography
            className={s.label}
            variant={TypographyVariant.body2}
            as={'label'}
            htmlFor={id}
          >
            {label}
          </Typography>
        )}
        <RadixSelect.Root value={value} {...props}>
          <RadixSelect.Trigger className={s.trigger} id={id} aria-label={currentItem?.label}>
            {currentItem?.label}
          </RadixSelect.Trigger>
          {/*<RadixSelect.Portal>*/}
          <RadixSelect.Content position="popper" className={s.content}>
            <RadixSelect.Viewport className={s.viewport}>{selectItems}</RadixSelect.Viewport>
          </RadixSelect.Content>
          {/*</RadixSelect.Portal>*/}
        </RadixSelect.Root>
      </div>
    )
  }
)
