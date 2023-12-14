import { FC, ReactNode } from 'react'

import { NavLink } from 'react-router-dom'

import s from './decksHeader.module.scss'

import { TypographyVariant } from '@/common'
import { Button, Typography } from '@/components'

type Props = {
  isOpenAddModal: boolean
  setIsOpenAddModal: (isOpen: boolean) => void
  count: number | undefined
  title?: string
  buttonText?: string
  className?: string
  children?: ReactNode
  cover?: string | null
  as?: 'button' | 'link'
  to?: string
}
export const DecksHeader: FC<Props> = ({
  setIsOpenAddModal,
  isOpenAddModal,
  count,
  title,
  buttonText,
  className,
  children,
  cover,
  as = 'button',
  to,
}) => {
  return (
    <div className={`${s.header} ${className}`}>
      <div className={s.content}>
        <div className={s.title}>
          <Typography className={s.title} variant={TypographyVariant.large} as={'h1'}>
            {title || 'Packs list'}
          </Typography>
          {count && (
            <Typography className={s.count} as={'span'}>
              {count}
            </Typography>
          )}
          {children}
        </div>
        {as === 'button' ? (
          <Button onClick={() => setIsOpenAddModal(!isOpenAddModal)} type={'button'}>
            {buttonText || 'Add New Pack'}
          </Button>
        ) : (
          <Button as={NavLink} to={to}>
            {buttonText || 'Add New Pack'}
          </Button>
        )}
      </div>
      {cover && <img className={s.preview} src={cover} alt="preview" />}
    </div>
  )
}
