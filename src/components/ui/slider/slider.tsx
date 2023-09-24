import { ChangeEvent, FC, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

type Props = {
  defaultValue: [number, number]
  min: number
  max: number
  step: number
  name: string
  callback: (values: [number, number]) => void
}
export const SliderCustom: FC<Props> = ({ defaultValue, min, max, step, name, callback }) => {
  const stringMinvalue = String(min)
  const stringMaxValue = String(max)
  const stringMinDefaultValue = String(defaultValue[0])
  const stringMaxDefaultValue = String(defaultValue[1])
  const maxValueForMinInput = max - step
  const minValueForMaxInput = min + step

  const [minValue, setMinValue] = useState(defaultValue[0])
  const [maxValue, setMaxValue] = useState(defaultValue[1])
  const [rootValue, setRootValue] = useState(defaultValue)
  const changeMinValueHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setMinValue(Number(e.currentTarget.value))
  const onBlurMinValueHandler = () => {
    const setRootValues = (firstValue: number) => {
      setRootValue(prevState => [firstValue, prevState[1]])
      changeRootValueHandler([firstValue, rootValue[1]])
    }

    if (
      (minValue > min || minValue === min) &&
      (minValue < maxValueForMinInput || minValue === maxValueForMinInput)
    ) {
      setMinValue(minValue)
      setRootValues(minValue)
    } else if (minValue < min) {
      setMinValue(min)
      setRootValues(min)
    } else if (minValue > maxValueForMinInput) {
      setMinValue(maxValueForMinInput)
      setRootValues(maxValueForMinInput)
    }
  }
  const changeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setMaxValue(Number(e.currentTarget.value))
  const onBlurMaxValueHandler = () => {
    const setRootValues = (secondValue: number) => {
      setRootValue(prevState => [prevState[0], secondValue])
      changeRootValueHandler([rootValue[0], secondValue])
    }

    if (
      (maxValue < max || maxValue === max) &&
      (maxValue > minValueForMaxInput || maxValue === minValueForMaxInput)
    ) {
      setMaxValue(maxValue)
      setRootValues(maxValue)
    } else if (maxValue > max) {
      setMaxValue(max)
      setRootValues(max)
    } else if (maxValue < minValueForMaxInput) {
      setMaxValue(minValueForMaxInput)
      setRootValues(minValueForMaxInput)
    }
  }

  const changeRootValueHandler = (values: [number, number]) => {
    setMinValue(values[0])
    setMaxValue(values[1])
    setRootValue(values)
    callback(values)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.input}>
        <label className={s.label} htmlFor="slider-min">
          Минимальное число
        </label>
        <input
          className={s.field}
          min={stringMinvalue}
          max={maxValueForMinInput}
          placeholder={stringMinDefaultValue}
          value={minValue}
          name={'min value'}
          onChange={changeMinValueHandler}
          onBlur={onBlurMinValueHandler}
          type="number"
        />
      </div>
      <Slider.Root
        className={s.root}
        defaultValue={rootValue}
        value={rootValue}
        step={step}
        name={name}
        max={max}
        min={min}
        onValueChange={changeRootValueHandler}
      >
        <Slider.Track className={s.track}>
          <Slider.Range className={s.range} />
        </Slider.Track>
        <Slider.Thumb className={s.thumb} />
        <Slider.Thumb className={s.thumb} />
      </Slider.Root>
      <div className={s.input}>
        <label className={s.label} htmlFor="slider-min">
          Максимальное число
        </label>
        <input
          className={s.field}
          placeholder={stringMaxDefaultValue}
          min={minValueForMaxInput}
          max={stringMaxValue}
          value={maxValue}
          name={'max value'}
          onChange={changeMaxValueHandler}
          onBlur={onBlurMaxValueHandler}
          type="number"
        />
      </div>
    </div>
  )
}
