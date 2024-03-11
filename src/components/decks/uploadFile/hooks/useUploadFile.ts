import { ChangeEvent, useEffect, useRef, useState } from 'react'

export type CoverType = File | undefined | 'empty'
export const useUploadFile = (setCover: (cover: CoverType) => void, defaultLocalCover?: string) => {
  useEffect(() => {
    return () => {
      setCover(undefined)
    }
  }, [])

  const inputRef = useRef<HTMLDivElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.querySelector('input')?.click()
  }

  const deleteCoverHandler = () => {
    setCover('empty')
    setLocalCover(undefined)
  }

  const [localCover, setLocalCover] = useState(defaultLocalCover)

  const [coverErrorMessage, setCoverErrorMessage] = useState<string | undefined>(undefined)
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        setCover(file)

        const blob = new Blob([file], { type: file.type })

        const downloadUrl = window.URL.createObjectURL(blob)

        setLocalCover(downloadUrl)
        setCoverErrorMessage(undefined)
      } else {
        setCoverErrorMessage('The file is too large')
      }
    }
  }

  const errorHandler = () => setCoverErrorMessage('The file is broken')

  return {
    localCover,
    coverErrorMessage,
    errorHandler,
    selectFileHandler,
    inputRef,
    uploadHandler,
    deleteCoverHandler,
  }
}
