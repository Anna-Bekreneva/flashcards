import { FC } from 'react'

import s from './dialogButtons.module.scss'

import { ButtonVariant } from '@/common'
import { Button } from '@/components'

type Props = {
  className?: string
  cancelText?: string
  cancelHandler: () => void
  agreeText?: string
  agreeHandler: () => void
  agreeButtonType?: 'button' | 'submit' | 'reset'
  agreeButtonDisabled?: boolean
}
export const DialogButtons: FC<Props> = ({
  className,
  cancelText = 'Cancel',
  agreeText = 'Ok',
  cancelHandler,
  agreeHandler,
  agreeButtonType = 'button',
  agreeButtonDisabled,
}) => {
  return (
    <div className={`${s.content} ${className}`}>
      <Button onClick={cancelHandler} variant={ButtonVariant.secondary} type={'button'}>
        {cancelText}
      </Button>
      <Button onClick={agreeHandler} type={agreeButtonType} disabled={agreeButtonDisabled}>
        {agreeText}
      </Button>
    </div>
  )
}
