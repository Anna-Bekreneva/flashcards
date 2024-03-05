import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

import { CurrentCardType } from '@/components'
import { CreateCardRequestType } from '@/services'

// todo: do we need create common file for shema?
const schema = z.object({
  question: z
    .string()
    .min(3, 'question must be longer than 3 characters')
    .max(500, 'question must be shorter than 500 characters'),
  answer: z
    .string()
    .min(3, 'answer must be longer than 3 characters')
    .max(500, 'answer must be shorter than 500 characters'),
})

type SchemaType = z.infer<typeof schema>

export const useCardModal = (
  callback: (data: CreateCardRequestType) => void,
  onOpenChange: () => void,
  currentCard: CurrentCardType | undefined
) => {
  const { id } = useParams()
  const [imgQuestionCover, setImgQuestionCover] = useState<File | undefined>(undefined)
  const [imgAnswerCover, setImgAnswerCover] = useState<File | undefined>(undefined)

  const onSubmit = (data: SchemaType) => {
    callback({
      ...data,
      id: id ? id : '',
      questionImg: imgQuestionCover,
      answerImg: imgAnswerCover,
    })
    onOpenChange()
    reset()
  }

  const { control, handleSubmit, reset, formState } = useForm<SchemaType>({
    defaultValues: {
      question: currentCard?.question ?? '',
      answer: currentCard?.answer ?? '',
    },
    resolver: zodResolver(schema),
  })

  return { setImgQuestionCover, setImgAnswerCover, onSubmit, control, handleSubmit, formState }
}
