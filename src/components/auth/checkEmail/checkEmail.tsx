import { FC } from 'react'

import { Link } from 'react-router-dom'

import sendEmail from '../../../assets/images/icons/sendEmail.svg'

import s from './checkEmail.module.scss'

import { TypographyVariant } from '@/common'
import { Button, Card, Typography } from '@/components'

type Props = {
  email: string
}
export const CheckEmail: FC<Props> = ({ email }) => {
  return (
    <Card className={s.card}>
      <Typography className={s.title} as={'h1'} variant={TypographyVariant.large}>
        Check Email
      </Typography>
      <span className={s.img} style={{ backgroundImage: `url(${sendEmail})` }} aria-hidden />
      <Typography className={s.text} variant={TypographyVariant.body2}>
        We’ve sent an Email with instructions to {email}
      </Typography>
      <Button as={Link} to={'/login'} fullWidth>
        Back to Sign In
      </Button>
    </Card>
  )
}
