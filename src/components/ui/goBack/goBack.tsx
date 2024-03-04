import { FC } from 'react'

import s from './goBack.module.scss'

type Props = {
  text: string
  clickHandler: () => void
}
export const GoBack: FC<Props> = ({ text, clickHandler }) => {
  return (
    <a className={s.back} onClick={clickHandler} href={''}>
      {text}
    </a>
  )
}
