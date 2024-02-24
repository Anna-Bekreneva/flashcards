import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import s from './learnPage.module.scss'

import { TypographyVariant } from '@/common'
import {
  Button,
  Card,
  ControlledRadioGroup,
  RadioItem,
  Typography,
  GoBack,
  Preloader,
  ProgressBar,
} from '@/components'
import {
  useGetDeckQuery,
  CardRatingType,
  useGetRandomCardQuery,
  useLazyGetRandomCardQuery,
  useSaveGradeOfCardMutation,
} from '@/services'

export const LearnPage = () => {
  const { id: deckId } = useParams()
  const [previousCardId, setPreviousCardId] = useState('')
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
    getNewCard({ id: deckId || '' })
    setIsShowAnswer(false)
  }

  const { control, handleSubmit } = useForm<RateFormType>()

  type RateFormType = {
    rate: string
  }

  if (isLoading || isSaveGradeLoading) {
    return <Preloader />
  }

  return (
    <>
      {(isFetching || isCardFetchingLazy) && <ProgressBar />}
      <section className={'container section'}>
        <GoBack text={'Back to Packs List'} clickHandler={goBackHandler} />
        <Card className={s.card}>
          <Typography as={'h1'} variant={TypographyVariant.large} className={s.cardName}>
            {'Learn ' + deckData?.name}
          </Typography>
          <Typography as={'span'} variant={TypographyVariant.body1}>
            <b>Question:</b> {card?.question}
          </Typography>
          {card?.questionImg && (
            <img src={card.questionImg} alt={'question'} className={s.cardImg} />
          )}
          {/*{card?.questionVideo && <video src={card.questionImg} className={s.cardImg} />}*/}
          <Typography variant={TypographyVariant.body1} className={s.attempts}>
            Number of attempts to answer the question: {card?.shots}
          </Typography>
          {!isShowAnswer && (
            <Button fullWidth onClick={() => setIsShowAnswer(true)}>
              Show answer
            </Button>
          )}
          {isShowAnswer && (
            <>
              <Typography variant={TypographyVariant.body1}>
                <b>Answer:</b> {card?.answer}
              </Typography>
              {card?.answerImg && <img src={card.answerImg} alt={'answer'} className={s.cardImg} />}
              {/*{card?.answerVideo && <video src={card.answerVideo} className={s.cardImg} />}*/}
              <Typography variant={TypographyVariant.subtitle1} className={s.rate}>
                Rate yourself:{' '}
              </Typography>
              <form onSubmit={handleSubmit(submitHandler)}>
                <ControlledRadioGroup name={'rate'} control={control} className={s.rateRadioGroup}>
                  <RadioItem label={'Did not know'} value={'1'} checked></RadioItem>
                  <RadioItem label={'Forgot'} value={'2'}></RadioItem>
                  <RadioItem label={'A lot of thought'} value={'3'}></RadioItem>
                  <RadioItem label={'Confused'} value={'4'}></RadioItem>
                  <RadioItem label={'Knew the answer'} value={'5'}></RadioItem>
                </ControlledRadioGroup>
                <Button fullWidth>
                  <>Next Question</>
                </Button>
              </form>
            </>
          )}
        </Card>
      </section>
    </>
  )
}
