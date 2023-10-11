import { forwardRef } from 'react'

import s from './header.module.scss'

import { EditIcon } from '@/assets/iconsComponents/edit.tsx'
import { IncubatorLogo } from '@/assets/iconsComponents/incubatorLogo.tsx'
import { SignOutIcon } from '@/assets/iconsComponents/signOut.tsx'
import { StartIcon } from '@/assets/iconsComponents/start.tsx'
import userPhoto from '@/assets/images/userPhoto.png'
import { Button } from '@/components/ui/button'
import { DropDownMenu, ItemType } from '@/components/ui/dropDownMenu'

type Props = {
  isLoggedIn: boolean
  triggerIMG?: string
  userName?: string
}

const Header = forwardRef<HTMLHeadElement, Props>(
  ({ isLoggedIn, userName, triggerIMG = userPhoto }, ref) => {
    const items: ItemType[] = [
      {
        icon: (
          <img src={userPhoto} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
        ),
        extraValue: 'www@bbfghfdhfjgfjgfhjhgvv',
        value: 'Ivan',
      },
      {
        icon: <EditIcon />,
        value: 'edit',
      },
      {
        icon: <StartIcon />,
        value: 'learn',
      },
      {
        icon: <SignOutIcon />,
        value: 'sign out',
      },
    ]

    return (
      <header ref={ref} className={s.header}>
        <div className={`container ${s.wrapper}`}>
          <a href={'#'} className={s.logo}>
            <IncubatorLogo />
          </a>
          {isLoggedIn ? (
            <span className={s.interactElements}>
              {userName && <span className={s.userName}>{userName}</span>}
              <DropDownMenu items={items} triggerIMG={triggerIMG} alignType={'end'} />
            </span>
          ) : (
            <Button>{'Sign In'}</Button>
          )}
        </div>
      </header>
    )
  }
)

export default Header
