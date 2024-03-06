import { ElementRef, forwardRef, ReactNode } from 'react'

import * as RadixDialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

import { TypographyVariant } from '@/common'
import { Card, Typography } from '@/components'

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
  ({ className, isOpen, onOpenChange, title, close = true, overlay = true, children }, ref?) => {
    const modalClasName = `${s.modal} ${className ? className : ''}`

    const content = (
      <div className={modalClasName}>
        <Card className={s.content} as={RadixDialog.Content} ref={ref}>
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
      </div>
    )

    return (
      <RadixDialog.Root open={isOpen} onOpenChange={onOpenChange}>
        {/*<RadixDialog.Portal>*/}

        {overlay ? (
          <RadixDialog.Overlay className={s.overlay}>{content}</RadixDialog.Overlay>
        ) : (
          <>{content}</>
        )}

        {/*</RadixDialog.Portal>*/}
      </RadixDialog.Root>
    )
  }
)
