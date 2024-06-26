import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import {
  CardRatingType,
  useAppDispatch,
  useAppSelector,
  useGetDeckQuery,
  useGetRandomCardQuery,
  useLazyGetRandomCardQuery,
  useSaveGradeOfCardMutation,
  selectPreviousCardId,
  cardsActions,
} from '@/services'

export const useLearnPage = () => {
  const dispatch = useAppDispatch()
  const { id: deckId } = useParams()
  const [isOpenQuestionPicture, setIsOpenQuestionPicture] = useState(false)
  const changeIsOpenQuestionPicture = () => setIsOpenQuestionPicture(!isOpenQuestionPicture)
  const [isOpenAnswerPicture, setIsOpenAnswerPicture] = useState(false)
  const changeIsOpenAnswerPicture = () => setIsOpenAnswerPicture(!isOpenAnswerPicture)
  const previousCardId = useAppSelector(selectPreviousCardId)
  const setPreviousCardId = (id: string) => dispatch(cardsActions.setPreviousCardId(id))
  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const { data: deckData } = useGetDeckQuery({ id: deckId || '' })
  const [getNewCard, { isFetching: isCardFetchingLazy }] = useLazyGetRandomCardQuery()
  const [saveGrade, { isLoading: isSaveGradeLoading }] = useSaveGradeOfCardMutation()

  const {
    data: card,
    isLoading,
    isFetching,
  } = useGetRandomCardQuery({ id: deckId || '', previousCardId })

  const navigate = useNavigate()
  const goBackHandler = () => navigate(`/decks/deck/${deckId}`)

  const submitHandler = (data: RateFormType) => {
    setPreviousCardId(card?.id ?? '')
    saveGrade({
      deckId: deckId ?? '',
      cardId: card?.id ?? '',
      grade: (+data.rate as CardRatingType) || 1,
    })
    // todo: we need to use then / catch
    getNewCard({ id: deckId || '' })
    setIsShowAnswer(false)
    reset()
  }

  const { control, handleSubmit, reset } = useForm<RateFormType>({
    defaultValues: { rate: '1' },
  })

  // todo: i'm not sure
  type RateFormType = {
    rate: string
  }

  return {
    isShowAnswer,
    setIsShowAnswer,
    deckData,
    isCardFetchingLazy,
    isSaveGradeLoading,
    card,
    isLoading,
    isFetching,
    goBackHandler,
    submitHandler,
    control,
    handleSubmit,
    isOpenQuestionPicture,
    changeIsOpenQuestionPicture,
    isOpenAnswerPicture,
    changeIsOpenAnswerPicture,
  }
}
