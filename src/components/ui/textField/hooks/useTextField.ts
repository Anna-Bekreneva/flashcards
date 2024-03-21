import { ComponentProps, HTMLInputTypeAttribute, useState } from 'react'

import s from '@/components/ui/textField/textField.module.scss'

const getFinalType = (type: ComponentProps<'input'>['type'], showPassword: boolean) =>
  type === 'password' && showPassword ? 'text' : type

type Props = {
  type: HTMLInputTypeAttribute | undefined
  errorMessage?: string
  disabled?: boolean
}
export const useTextField = ({ type, errorMessage, disabled }: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const isSearch = type === 'search'

  const wrapperClassName = `${isSearch ? s.searchWrapper : ''} ${
    errorMessage ? s.errorWrapper : ''
  } ${disabled ? s.disabledWrapper : ''} ${s.wrapper}`
  const inputClassName = `${isSearch ? s.searchField : ''} ${s.field}`
  const finalType = getFinalType(type, showPassword)

  return { showPassword, setShowPassword, isPassword, wrapperClassName, inputClassName, finalType }
}
