import { ElementRef, forwardRef, ReactNode } from 'react'

import * as RadixDialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

import { TypographyVariant } from '@/common/types/types.ts'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

type Props = {
  className?: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  title?: string
  close?: boolean
  overlay?: boolean
  children: ReactNode
}
export const Modal = forwardRef<ElementRef<typeof RadixDialog.Content>, Props>(
  ({ className, isOpen, onOpenChange, title, close = false, overlay = false, children }, ref?) => {
    const contentClasName = `${s.content} ${className ? className : ''}`

    return (
      <RadixDialog.Root open={isOpen} onOpenChange={onOpenChange}>
        {/*<RadixDialog.Portal>*/}
        {overlay && <RadixDialog.Overlay className={s.overlay} />}
        <Card as={RadixDialog.Content} className={contentClasName} ref={ref}>
          {(title || close) && (
            <header className={s.header}>
              {title && (
                <Typography as={'span'} variant={TypographyVariant.h2}>
                  {title}
                </Typography>
              )}
              {close && (
                <RadixDialog.Close asChild>
                  <button className={s.close} type={'button'} aria-label={'Close modal'} />
                </RadixDialog.Close>
              )}
            </header>
          )}
          {children}
        </Card>
        {/*</RadixDialog.Portal>*/}
      </RadixDialog.Root>
    )
  }
)
