import { forwardRef } from 'react'

import s from './header.module.scss'

import { Logo, PersonIcon, SignOutIcon } from '@/assets/iconsComponents'
import userPhoto from '@/assets/images/user.png'
import { TypographyVariant } from '@/common'
import { Button, DropDownMenu, Typography, DropDownItem } from '@/components'

type Props = {
  userName?: string
  className?: string
  userEmail?: string
}

export const Header = forwardRef<HTMLHeadElement, Props>(
  ({ userName, userEmail, className }, ref) => {
    return (
      <header ref={ref} className={`${s.header} ${className ? className : ''}`}>
        <div className={`container ${s.wrapper}`}>
          <a className={s.logo} href={'#'}>
            <Logo />
          </a>
          {userName ? (
            <span className={s.userInfo}>
              {userName && (
                <Typography className={s.name} variant={TypographyVariant.subtitle1} as={'span'}>
                  {userName}
                </Typography>
              )}
              <DropDownMenu
                className={s.dropdown}
                trigger={
                  <button type="button">
                    <img className={s.ava} src={userPhoto} alt={userName} width={36} height={36} />
                  </button>
                }
              >
                <DropDownItem className={s.dropdownItem}>
                  <div className={s.dropdownItem}>
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
                  </div>
                </DropDownItem>
                <DropDownItem className={s.dropdownItem}>
                  <PersonIcon /> My Profile
                </DropDownItem>
                <DropDownItem className={s.dropdownItem}>
                  <SignOutIcon /> Sign Out
                </DropDownItem>
              </DropDownMenu>
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
