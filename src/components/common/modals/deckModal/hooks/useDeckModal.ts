import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { CoverType } from '@/components'
import { DeckType } from '@/services'

export type UpdateDeckType = {
  name: string
  isPrivate: boolean
  cover: CoverType
}

export type CurrentDeckType = Partial<Omit<UpdateDeckType, 'cover'> & { cover: string }>

type Props = {
  onOpenChange: () => void
  currentDeck?: CurrentDeckType
  callBack: (data: UpdateDeckType) => Promise<DeckType>
}

const DeckSchema = z.object({
  name: z
    .string()
    .min(3, 'name must be longer than or equal to 3 characters')
    .max(30, 'name must be shorter than or equal to 30 characters'),
  isPrivate: z.boolean().optional().default(false),
})

type DeckSchemaType = z.infer<typeof DeckSchema>
export const useDeckModal = ({ onOpenChange, currentDeck, callBack }: Props) => {
  const submitHandler = (data: DeckSchemaType) => {
    callBack({ ...data, cover }).then(() => {
      onOpenChange()
      reset()
    })
  }

  const [cover, setCover] = useState<CoverType>(undefined)

  const { control, reset, handleSubmit, formState } = useForm<DeckSchemaType>({
    defaultValues: { name: currentDeck?.name, isPrivate: currentDeck?.isPrivate },
    resolver: zodResolver(DeckSchema),
  })

  const agreeButtonDisabled =
    !!Object.keys(formState.errors).length || (!formState.isDirty && cover === undefined)

  return {
    submitHandler,
    setCover,
    control,
    handleSubmit,
    agreeButtonDisabled,
  }
}
