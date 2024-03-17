import s from './learnPage.module.scss'

import { TypographyVariant } from '@/common'
import {
  Button,
  Card,
  ControlledRadioGroup,
  GoBack,
  Preloader,
  ProgressBar,
  RadioItem,
  Typography,
} from '@/components'
import { useLearnPage } from '@/pages/learnPage/hooks'

export const LearnPage = () => {
  const {
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
  } = useLearnPage()

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
                  <RadioItem label={'Did not know'} value={'1'} />
                  <RadioItem label={'Forgot'} value={'2'} />
                  <RadioItem label={'A lot of thought'} value={'3'} />
                  <RadioItem label={'Confused'} value={'4'} />
                  <RadioItem label={'Knew the answer'} value={'5'} />
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
