import { PropsWithChildren } from 'react'

import s from './notFound.module.scss'

export const NotFound = (props: PropsWithChildren) => {
  return <div className={s.content}> {props.children} </div>
}
