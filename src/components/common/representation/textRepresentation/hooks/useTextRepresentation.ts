import { useState } from 'react'

export const useTextRepresentation = (text: string) => {
  const MAX_SYMBOLS = 45
  const [isShowWholeText, setIsShowWholeText] = useState<boolean>(text.length <= MAX_SYMBOLS)
  const isTextTooLarge = text.length >= MAX_SYMBOLS
  const textStart = text.slice(0, MAX_SYMBOLS)
  const changeIsShowWholeText = () => setIsShowWholeText(!isShowWholeText)

  return { isTextTooLarge, isShowWholeText, textStart, changeIsShowWholeText }
}
