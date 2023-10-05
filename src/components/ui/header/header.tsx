import { FC, ReactNode } from 'react'

import s from './header.module.scss'

import { IncubatorLogo } from '@/assets/iconsComponents/incubatorLogo.tsx'

type Props = {
  element: ReactNode
  userName?: string
}

const Header: FC<Props> = ({ element, userName }) => {
  return (
    <div className={s.header}>
      <span>{<IncubatorLogo />}</span>
      <span className={s.interactElements}>
        {userName && <span className={s.userName}>{userName}</span>}
        {element}
      </span>
    </div>
  )
}

export default Header
