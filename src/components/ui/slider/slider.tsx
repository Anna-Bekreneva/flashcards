import { forwardRef } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'
import { SliderProps } from '@radix-ui/react-slider'

import s from './slider.module.scss'

import { TextField } from '@/components'

type Props = {
  value: [number, number]
  className?: string
} & SliderProps
export const Slider = forwardRef<HTMLDivElement, Props>(
  ({ min = 0, max = 100, step = 1, value, className, ...props }, ref?) => {
    const maxValueForMinInput = max - step
    const minValueForMaxInput = min + step
    const minValue = value[0]
    const maxValue = value[1]
    const changeMinValueHandler = (value: string) => {
      const minValue = Number(value)

      if ((minValue > min || minValue === min) && minValue < maxValue) {
        props.onValueChange?.([minValue, maxValue])
      } else if (minValue < min) {
        props.onValueChange?.([min, maxValue])
      } else if (minValue > maxValue || minValue === maxValue) {
        props.onValueChange?.([maxValue - step, maxValue])
      }
    }
    const changeMaxValueHandler = (value: string) => {
      const maxValue = Number(value)

      if ((maxValue < max || maxValue === max) && maxValue > minValue) {
        props.onValueChange?.([minValue, maxValue])
      } else if (maxValue > max) {
        props.onValueChange?.([minValue, max])
      } else if (maxValue < minValue || maxValue === minValue) {
        props.onValueChange?.([minValue, minValue + step])
      }
    }

    const wrapperClassName = `${s.wrapper} ${props.disabled && s.disabled} ${
      className && className
    }`

    return (
      <div className={wrapperClassName} ref={ref}>
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
