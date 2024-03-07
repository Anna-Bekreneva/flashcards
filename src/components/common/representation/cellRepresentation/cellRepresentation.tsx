import { FC } from 'react'

import s from './cellRepresentation.module.scss'

import { TextRepresentation } from '@/components'

type Props = {
  text: string
  img: string | null
}

export const CellRepresentation: FC<Props> = ({ text, img }) => {
  return (
    <div>
      {img ? (
        <div className={s.preview}>
          <img
            className={s.image}
            src={img}
            alt={'preview'}
            width={118}
            height={48}
            loading={'lazy'}
          />
          <TextRepresentation text={text} />
        </div>
      ) : (
        <TextRepresentation text={text} />
      )}
    </div>
  )
}
