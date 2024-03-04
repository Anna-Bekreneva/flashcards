import { ChangeEvent, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

import c from './cardModal.module.scss'

import { ImageIcon } from '@/assets/iconsComponents'
import { ButtonVariant } from '@/common'
import { Button, ControlledTextField, DialogButtons, Modal, TextField } from '@/components'
import s from '@/components/decks/uploadFile/uploadFile.module.scss'
import { CardsResponseType, CreateCardRequestType } from '@/services/cards'

const schema = z.object({
  question: z
    .string()
    .min(3, 'question must be longer than 3 characters')
    .max(500, 'question must be shorter than 500 characters'),
  answer: z
    .string()
    .min(3, 'answer must be longer than 3 characters')
    .max(500, 'answer must be shorter than 500 characters'),
  questionImg: z.string().nullable().optional(),
  answerImg: z.string().nullable().optional(),
  // questionVideo: z.string().nullable().optional(),
  // answerVideo: z.string().nullable().optional(),
})

type SchemaType = z.infer<typeof schema>

type Props = {
  isOpen: boolean
  onOpenChange: () => void
  title: string
  callback: (data: CreateCardRequestType) => void
  submitBtnCaption: string
  currentCard?: CardsResponseType
}
export const CardModal = ({
  isOpen,
  onOpenChange,
  submitBtnCaption,
  title,
  callback,
  currentCard,
}: Props) => {
  const { id } = useParams()
  const [imgQuestionCover, setImgQuestionCover] = useState<File | undefined>(undefined)
  const [imgAnswerCover, setImgAnswerCover] = useState<File | undefined>(undefined)
  // const [videoQuestionCover, setVideoQuestionCover] = useState<File | undefined>(undefined)
  // const [videoAnswerCover, setVideoAnswerCover] = useState<File | undefined>(undefined)

  const onSubmit = (data: SchemaType) => {
    callback({
      ...data,
      id: id ? id : '',
      questionImg: imgQuestionCover,
      answerImg: imgAnswerCover,
      // questionVideo: videoQuestionCover,
      // answerVideo: videoAnswerCover,
    })
    onOpenChange()
    reset()
  }

  const { control, handleSubmit, reset, formState } = useForm<SchemaType>({
    defaultValues: {
      question: currentCard?.question,
      answer: currentCard?.answer,
      questionImg: currentCard?.questionImg,
      answerImg: currentCard?.answerImg,
    },
    resolver: zodResolver(schema),
  })

  return (
    <Modal key={id} isOpen={isOpen} onOpenChange={onOpenChange} title={title} className={c.modal}>
      <form onSubmit={handleSubmit(onSubmit)} className={c.form}>
        <ControlledTextField type={'text'} control={control} name={'question'} label={'Question'} />
        <ControlledTextField type={'text'} control={control} name={'answer'} label={'Answer'} />
        <Uploading
          text={'Image Question'}
          setCover={setImgQuestionCover}
          defaultLocalCover={currentCard?.questionImg}
        />
        <Uploading
          text={'Image Answer'}
          setCover={setImgAnswerCover}
          defaultLocalCover={currentCard?.answerImg}
        />
        {/*<Uploading*/}
        {/*  text={'Video Question'}*/}
        {/*  setCover={setVideoQuestionCover}*/}
        {/*  accept={'video'}*/}
        {/*/>*/}
        {/*<Uploading*/}
        {/*  text={'Video Answer'}*/}
        {/*  setCover={setVideoAnswerCover}*/}
        {/*  accept={'video'}*/}
        {/*/>*/}
        <DialogButtons
          agreeHandler={() => handleSubmit(onSubmit)}
          cancelHandler={onOpenChange}
          agreeText={submitBtnCaption}
          agreeButtonType={'submit'}
          agreeButtonDisabled={!!Object.keys(formState.errors).length}
        />
      </form>
    </Modal>
  )
}

type UploadingProps = {
  text: string
  setCover: (cover: File) => void
  defaultLocalCover?: string | null
  accept?: 'image' | 'video'
}
const Uploading = ({
  setCover,
  defaultLocalCover = '',
  text,
  accept = 'image',
}: UploadingProps) => {
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

  return (
    <>
      <div className={s.content}>
        {localCover && accept === 'image' && (
          <img
            className={`${coverErrorMessage ? '' : s.img}`}
            src={localCover}
            onError={errorHandler}
            alt="cover"
          />
        )}
        {localCover && accept === 'video' && (
          <video
            className={`${coverErrorMessage ? '' : s.img}`}
            src={localCover}
            onError={errorHandler}
          />
        )}
        <Button variant={ButtonVariant.secondary} onClick={selectFileHandler} type={'button'}>
          <ImageIcon />
          Upload {text}
        </Button>
        <TextField
          className={s.imageField}
          ref={inputRef}
          type="file"
          accept={`${accept}/*`}
          errorMessage={coverErrorMessage}
          onChange={uploadHandler}
        />
      </div>
    </>
  )
}
