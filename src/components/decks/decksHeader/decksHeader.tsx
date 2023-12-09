import { FC } from 'react'

import s from './decksHeader.module.scss'

import { TypographyVariant } from '@/common'
import { Button, Typography } from '@/components'

type Props = {
  isOpenAddModal: boolean
  setIsOpenAddModal: (isOpen: boolean) => void
}
export const DecksHeader: FC<Props> = ({ setIsOpenAddModal, isOpenAddModal }) => {
  return (
    <div className={s.header}>
      <Typography variant={TypographyVariant.large} as={'h1'}>
        Packs list
      </Typography>
      <Button onClick={() => setIsOpenAddModal(!isOpenAddModal)} type={'button'}>
        Add New Pack
      </Button>
    </div>
  )
}
