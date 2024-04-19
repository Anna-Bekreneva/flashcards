import { forwardRef, useState } from 'react'

import { Link } from 'react-router-dom'

import s from './header.module.scss'

import { Logo, PersonIcon, SignOutIcon } from '@/assets/iconsComponents'
import userPhoto from '@/assets/images/user.png'
import { ButtonVariant, TypographyVariant } from '@/common'
import { Button, DropDownMenu, Typography, DropDownItem } from '@/components'

type Props = {
  userName?: string
  className?: string
  userEmail?: string
}

export const Header = forwardRef<HTMLHeadElement, Props>(
  ({ userName, userEmail, className }, ref) => {
    const [isOpenDropDown, setIsOpenDropDown] = useState(false)

    return (
      <header ref={ref} className={`${s.header} ${className ? className : ''}`}>
        <div className={`container ${s.wrapper}`}>
          <Link className={s.logo} to={'/'}>
            <Logo />
          </Link>
          {userName ? (
            <div className={s.userInfo}>
              <DropDownMenu
                open={isOpenDropDown}
                className={s.dropdown}
                onOpenChange={() => setIsOpenDropDown(!isOpenDropDown)}
                trigger={
                  <button className={s.trigger} type="button">
                    <Typography
                      className={s.name}
                      variant={TypographyVariant.subtitle1}
                      as={'span'}
                    >
                      {userName}
                    </Typography>
                    <img className={s.ava} src={userPhoto} alt={userName} width={36} height={36} />
                  </button>
                }
              >
                <DropDownItem>
                  <Link className={s.dropdownItem} to={'/profile'}>
                    <img className={s.ava} src={userPhoto} alt={userName} width={36} height={36} />
                    <div className={s.dropdownInfo}>
                      <Typography variant={TypographyVariant.subtitle2} as={'span'}>
                        {userName}
                      </Typography>
                      <Typography
                        className={s.email}
                        variant={TypographyVariant.caption}
                        as={'span'}
                      >
                        {userEmail}
                      </Typography>
                    </div>
                  </Link>
                </DropDownItem>
                <DropDownItem>
                  <Typography
                    className={s.dropdownItem}
                    variant={TypographyVariant.caption}
                    as={Link}
                    to={'/profile'}
                  >
                    <PersonIcon /> My Profile
                  </Typography>
                </DropDownItem>
                <DropDownItem>
                  <Typography
                    className={s.dropdownItem}
                    variant={TypographyVariant.caption}
                    as={'button'}
                    type={'button'}
                  >
                    <SignOutIcon /> Sign Out
                  </Typography>
                </DropDownItem>
              </DropDownMenu>
            </div>
          ) : (
            <Button as={Link} to={'/login'} variant={ButtonVariant.secondary}>
              {'Sign In'}
            </Button>
          )}
        </div>
      </header>
    )
  }
)

export default Header
