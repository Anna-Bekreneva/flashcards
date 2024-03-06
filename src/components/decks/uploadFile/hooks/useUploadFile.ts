import { ChangeEvent, useEffect, useRef, useState } from 'react'

export const useUploadFile = (
  setCover: (cover: File | undefined) => void,
  defaultLocalCover?: string
) => {
  useEffect(() => {
    return () => {
      setCover(undefined)
    }
  }, [])
  const inputRef = useRef<HTMLDivElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.querySelector('input')?.click()
  }

  const [localCover, setLocalCover] = useState(defaultLocalCover)
  const [coverErrorMessage, setCoverErrorMessage] = useState<string | undefined>(undefined)
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        const formData = new FormData()

        formData.append('cover', file)
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

  return { localCover, coverErrorMessage, errorHandler, selectFileHandler, inputRef, uploadHandler }
}
