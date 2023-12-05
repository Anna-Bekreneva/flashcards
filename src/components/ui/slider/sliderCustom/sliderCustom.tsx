import { forwardRef } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'
import { SliderProps } from '@radix-ui/react-slider'

import s from '../slider.module.scss'

import { TextField, useSlider, ValuesSliderType } from '@/components'

type Props = {
  value: ValuesSliderType
  className?: string
} & SliderProps

export const SliderCustom = forwardRef<HTMLDivElement, Props>(
  ({ min = 0, max = 100, step = 1, value, className, ...props }, ref?) => {
    const maxValueForMinInput = max - step
    const minValueForMaxInput = min + step
    const minValue = value[0]
    const maxValue = value[1]

    const { changeMinValueHandler, changeMaxValueHandler } = useSlider(
      props.onValueCommit,
      min,
      step,
      max,
      minValue,
      maxValue
    )

    return (
      <div className={`${s.wrapper} ${className}`} ref={ref}>
        <TextField
          className={s.field}
          min={String(min)}
          max={maxValueForMinInput}
          value={minValue}
          name={'min value'}
          onValueChange={changeMinValueHandler}
          type="number"
          disabled={props.disabled}
        />

        <RadixSlider.Root
          className={s.root}
          value={value}
          min={min}
          max={max}
          step={step}
          {...props}
        >
          <RadixSlider.Track className={s.track}>
            <RadixSlider.Range className={s.range} />
          </RadixSlider.Track>
          <RadixSlider.Thumb className={s.thumb} />
          <RadixSlider.Thumb className={s.thumb} />
        </RadixSlider.Root>
        <TextField
          className={s.field}
          min={minValueForMaxInput}
          max={String(max)}
          value={maxValue}
          name={'max value'}
          onValueChange={changeMaxValueHandler}
          type="number"
          disabled={props.disabled}
        />
      </div>
    )
  }
)
