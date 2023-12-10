import { FC } from 'react'

import s from './decksHeader.module.scss'

import { TypographyVariant } from '@/common'
import { Button, Typography } from '@/components'

type Props = {
  isOpenAddModal: boolean
  setIsOpenAddModal: (isOpen: boolean) => void
  count: number | undefined
}
export const DecksHeader: FC<Props> = ({ setIsOpenAddModal, isOpenAddModal, count }) => {
  return (
    <div className={s.header}>
      <div className={s.title}>
        <Typography variant={TypographyVariant.large} as={'h1'}>
          Packs list
        </Typography>
        {count && (
          <Typography className={s.count} as={'span'}>
            {count}
          </Typography>
        )}
      </div>
      <Button onClick={() => setIsOpenAddModal(!isOpenAddModal)} type={'button'}>
        Add New Pack
      </Button>
    </div>
  )
}
