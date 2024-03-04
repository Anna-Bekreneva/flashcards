import { FC } from 'react'

import { TypographyVariant } from '@/common'
import { DialogButtons, Modal, Typography } from '@/components'
import s from '@/components/decks/decksModals/decksModals.module.scss'

type Props = {
  isOpen: boolean
  onOpenChange: () => void
  deleteCallback: ({}: { id: string }) => void
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
            deleteCallback({ id: idDelete })
            onOpenChange()
          }}
        />
      </div>
    </Modal>
  )
}
