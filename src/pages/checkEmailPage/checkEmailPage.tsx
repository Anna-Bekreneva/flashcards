import { FC } from 'react'

import { CheckEmail, Props } from '@/components'

export const CheckEmailPage: FC<Props> = () => {
  return (
    <section className={'page-modal'}>
      <CheckEmail email={'email'} />
    </section>
  )
}
