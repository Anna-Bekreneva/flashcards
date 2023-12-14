import { FC, PropsWithChildren } from 'react'

import s from './notFound.module.scss'

type Props = {
  className?: string
} & PropsWithChildren
export const NotFound: FC<Props> = ({ className, children }) => {
  return <div className={`${s.content} ${className}`}> {children} </div>
}
