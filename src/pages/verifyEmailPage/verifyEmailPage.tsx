import s from './verifyEmailPage.module.scss'

import { TypographyVariant } from '@/common'
import { Button, Card, GoBack, Preloader, Typography } from '@/components'
import { useVerifyEmailPage } from '@/pages/verifyEmailPage/hooks/useVerifyEmailPage.ts'

export const VerifyEmailPage = () => {
  const { resendVerifyHandler, isLoadingResend, isLoading, goBack, timer } = useVerifyEmailPage()

  if (isLoading || isLoadingResend) return <Preloader />

  return (
    <section className={'container section'}>
      <GoBack text={'Back to Sign up'} clickHandler={goBack} />
      <div className={'page-modal'}>
        <Card className={s.card}>
          <Typography variant={TypographyVariant.large}>
            {timer > 1
              ? `You can send a new email through: ${timer}`
              : 'Didn`t you get the letter?'}
          </Typography>
          <Button onClick={resendVerifyHandler} disabled={timer > 0}>
            Send a new email
          </Button>
        </Card>
      </div>
    </section>
  )
}
