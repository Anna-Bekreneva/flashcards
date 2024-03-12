import { FC } from 'react'

import s from './pictureModal.module.scss'

import { Modal } from '@/components'

type Props = {
  src: string
  isOpenPicture: boolean
  callback: () => void
}
export const PictureModal: FC<Props> = ({ src, isOpenPicture, callback }) => {
  return (
    <Modal className={s.modal} isOpen={isOpenPicture} onOpenChange={callback}>
      <img className={s.img} src={src} alt="cover" />
    </Modal>
  )
}
