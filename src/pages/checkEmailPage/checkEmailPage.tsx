import { FC } from 'react'

import { CheckEmail, Props } from '@/components'

export const CheckEmailPage: FC<Props> = () => {
  return (
    <div className={'page-modal'}>
      <CheckEmail email={'email'} />
    </div>
  )
}
