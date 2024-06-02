import { FC } from 'react'

import s from '../modals.module.scss'

import { TypographyVariant } from '@/common'
import { DialogButtons, Modal, Typography } from '@/components'
import { DeckType } from '@/services'

type Props = {
  isOpen: boolean
  onOpenChange: () => void
  deleteCallback: (id: string) => Promise<Omit<DeckType, 'author'>>
  title: string
  nameDelete: string
  idDelete: string
}
export const DeleteModal: FC<Props> = ({
  isOpen,
  onOpenChange,
  title,
  nameDelete,
  idDelete,
  deleteCallback,
}) => {
  return (
    <Modal
      key={idDelete}
      title={title}
      isOpen={isOpen}
      className={s.modal}
      onOpenChange={onOpenChange}
    >
      <div className={s.modalWrapper}>
        <div className={s.modalContent}>
          <Typography>
            Do you really want to remove
            <Typography variant={TypographyVariant.subtitle2} as={'span'}>
              {` ${nameDelete}? `}
            </Typography>
            All cards will be deleted.
          </Typography>
        </div>
        <DialogButtons
          cancelHandler={onOpenChange}
          agreeText={title}
          agreeHandler={() => {
            deleteCallback(idDelete).then(() => {
              onOpenChange()
            })
          }}
        />
      </div>
    </Modal>
  )
}
