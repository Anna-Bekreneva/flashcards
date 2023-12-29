import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import s from './learnPage.module.scss'

import { TypographyVariant } from '@/common'
import { Button, Card, ControlledRadioGroup, RadioItem, ReturnBack, Typography } from '@/components'
import { Preloader } from '@/components/ui/preloader'
import { ProgressBar } from '@/components/ui/progressBar'
import {
  useGetLearnCardQuery,
  useGetDeckQuery,
  useSaveGradeMutation,
  useLazyGetLearnCardQuery,
} from '@/services'
export const LearnPage = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(`/decks/deck/${deckId}`)
  const [previousCardId, setPreviousCardId] = useState('')
  const { id: deckId } = useParams()
  const { data: deck } = useGetDeckQuery({ id: deckId ?? '' })
  const {
    data: card,
    isFetching,
    isLoading,
  } = useGetLearnCardQuery({ id: deckId ?? '', previousCardId })
  const [getNewCard, { isFetching: isFetchingGetLazy }] = useLazyGetLearnCardQuery()
  const [saveGrade, { isLoading: isLoadingSaveGrade }] = useSaveGradeMutation()
  const [isShowAnswer, setIsShowAnswer] = useState(false)

  const { control, handleSubmit } = useForm<DataType>()

  type DataType = {
    rate: string
  }
  const submitHandler = (data: DataType) => {
    saveGrade({
      id: card?.deckId ?? '',
      cardId: card?.id ?? '',
      grade: Number(data.rate),
    })
    setPreviousCardId(card?.id ?? '')
    getNewCard({ id: deckId ?? '', previousCardId })
    setIsShowAnswer(false)
  }

  if (isLoading || isLoadingSaveGrade) {
    return <Preloader />
  }

  return (
    <>
      {(isFetching || isFetchingGetLazy) && <ProgressBar />}
      <section className={'container section'}>
        <ReturnBack text={'Back to Deck'} clickHandler={goBack} />
        <Card className={s.card}>
          <Typography className={s.title} as={'h1'} variant={TypographyVariant.large}>
            Learn {deck?.name}
          </Typography>
          <Typography>
            <Typography as={'span'} variant={TypographyVariant.subtitle1}>
              Question:
            </Typography>{' '}
            {card?.question}
          </Typography>
          <Typography className={s.attempt}>
            Количество попыток ответов на вопрос:
            <Typography as={'span'} variant={TypographyVariant.subtitle2}>
              {' '}
              {card?.shots}
            </Typography>
          </Typography>
          {isShowAnswer && (
            <>
              <Typography className={s.answer}>
                <Typography as={'span'} variant={TypographyVariant.subtitle1}>
                  Answer:
                </Typography>{' '}
                {card?.answer}
              </Typography>
              <form onSubmit={handleSubmit(submitHandler)}>
                <Typography className={s.rate} as={'span'} variant={TypographyVariant.subtitle1}>
                  Rate yourself:{' '}
                </Typography>

                <ControlledRadioGroup className={s.radios} control={control} name={'rate'}>
                  <RadioItem label={'Did not know'} value={'1'} />
                  <RadioItem label={'Forgot'} value={'2'} />
                  <RadioItem label={'A lot of thought'} value={'3'} />
                  <RadioItem label={'Сonfused'} value={'4'} />
                  <RadioItem label={'Knew the answer'} value={'5'} />
                </ControlledRadioGroup>

                <Button className={s.button}>Next Question</Button>
              </form>
            </>
          )}
          {!isShowAnswer && (
            <Button className={s.button} onClick={() => setIsShowAnswer(true)}>
              Show Answer
            </Button>
          )}
        </Card>
      </section>
    </>
  )
}
