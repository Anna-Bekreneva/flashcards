import { FC, ReactNode } from 'react'

import s from './textRepresentation.module.scss'

import { Button, useTextRepresentation } from '@/components'

type Props = {
  text: string
}
export const TextRepresentation: FC<Props> = ({ text }) => {
  const { isTextTooLarge, isShowWholeText, textStart, changeIsShowWholeText } =
    useTextRepresentation(text)

  if (!isTextTooLarge) {
    return <p>{text}</p>
  } else {
    return (
      <p>
        {isShowWholeText ? (
          <>
            {text} <ManageButton callback={changeIsShowWholeText}>Hide</ManageButton>
          </>
        ) : (
          <>
            {textStart}...
            <ManageButton callback={changeIsShowWholeText}>More</ManageButton>
          </>
        )}
      </p>
    )
  }
}

type ManageButtonProps = {
  callback: () => void
  children: ReactNode
}
const ManageButton: FC<ManageButtonProps> = ({ callback, children }) => {
  return (
    <Button variant={'link'} className={s.linkBtn} onClick={callback} type={'button'}>
      {children}
    </Button>
  )
}
