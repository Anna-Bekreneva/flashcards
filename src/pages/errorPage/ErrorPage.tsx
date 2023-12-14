import { NavLink } from 'react-router-dom'

import s from './errorPage.module.scss'

import errorImg from '@/assets/images/icons/404.svg'
import { TypographyVariant } from '@/common'
import { Button, NotFound, Typography } from '@/components'

export const ErrorPage = () => {
  return (
    <div className={s.container}>
      <NotFound className={s.wrapper}>
        <img src={errorImg} alt="404" width={450} height={200} />
        <Typography as={'h1'} variant={TypographyVariant.body1}>
          Sorry! Page not found!
        </Typography>
        <Button as={NavLink} to={'/'}>
          Back to home page
        </Button>
      </NotFound>
    </div>
  )
}
