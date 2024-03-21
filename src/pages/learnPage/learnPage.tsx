import s from './learnPage.module.scss'

import { TypographyVariant } from '@/common'
import {
  Button,
  Card,
  ControlledRadioGroup,
  GoBack,
  PictureModal,
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
    isOpenQuestionPicture,
    changeIsOpenQuestionPicture,
    isOpenAnswerPicture,
    changeIsOpenAnswerPicture,
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
            <div className={s.cardImgContainer}>
              <img src={card.questionImg} alt={'question'} className={s.cardImg} />
              <button
                className={s.buttonOpen}
                onClick={changeIsOpenQuestionPicture}
                aria-label={'open image'}
                type={'button'}
                aria-hidden
              />
            </div>
          )}
          {card?.questionImg && isOpenQuestionPicture && (
            <PictureModal
              src={card.questionImg}
              isOpenPicture={isOpenQuestionPicture}
              callback={changeIsOpenQuestionPicture}
            />
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
              {card?.answerImg && (
                <div className={s.cardImgContainer}>
                  <img src={card.answerImg} alt={'answer'} className={s.cardImg} />
                  <button
                    className={s.buttonOpen}
                    onClick={changeIsOpenAnswerPicture}
                    aria-label={'open image'}
                    type={'button'}
                    aria-hidden
                  />
                </div>
              )}
              {card?.answerImg && isOpenAnswerPicture && (
                <PictureModal
                  src={card.answerImg}
                  isOpenPicture={isOpenAnswerPicture}
                  callback={changeIsOpenAnswerPicture}
                />
              )}
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
