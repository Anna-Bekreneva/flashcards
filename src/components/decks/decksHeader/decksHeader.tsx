import { FC, ReactNode } from 'react'

import s from './decksHeader.module.scss'

import { TypographyVariant } from '@/common'
import { Typography } from '@/components'

type Props = {
  count: number | undefined
  title?: string
  className?: string
  cover?: string | null
  actionElement?: ReactNode
  children?: ReactNode
}
export const DecksHeader: FC<Props> = ({
  count,
  title,
  className,
  cover,
  actionElement,
  children,
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
        {actionElement}
      </div>
      {cover && <img className={s.preview} src={cover} alt="preview" />}
    </div>
  )
}
