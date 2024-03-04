import { FC } from 'react'

import s from '../decksModals.module.scss'

import { TypographyVariant } from '@/common'
import { DialogButtons, Modal, Typography } from '@/components'
import { useDeleteDeckMutation } from '@/services'

type Props = {
  isOpen: boolean
  onOpenChange: () => void
  title: string
  nameDeleteDeck: string
  idDeleteDeck: string
}
export const DeleteDeckModal: FC<Props> = ({
  isOpen,
  onOpenChange,
  title,
  nameDeleteDeck,
  idDeleteDeck,
}) => {
  const [deleteDeck] = useDeleteDeckMutation()

  return (
    <Modal
      key={idDeleteDeck}
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
              {` ${nameDeleteDeck}? `}
            </Typography>
            All cards will be deleted.
          </Typography>
        </div>
        <DialogButtons
          cancelHandler={onOpenChange}
          agreeText={'Delete Pack'}
          agreeHandler={() => {
            deleteDeck(idDeleteDeck)
            onOpenChange()
          }}
        />
      </div>
    </Modal>
  )
}
