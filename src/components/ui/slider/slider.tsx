import { forwardRef, useEffect } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'
import { SliderProps } from '@radix-ui/react-slider'

import s from './slider.module.scss'

import { ControlledTextField, SliderFormValues, useSliderHook } from '@/components'

export type ValuesSliderType = [number, number]

type Props = {
  value: ValuesSliderType
  className?: string
  changeMaxValueHandler?: (value: string) => void
  changeMinValueHandler?: (value: string) => void
  onSubmit: (data: SliderFormValues) => void
} & SliderProps

export const Slider = forwardRef<HTMLFormElement, Props>(
  ({ min = 0, max = 100, step = 1, value, className, ...props }, ref?) => {
    const {
      minValue,
      maxValue,
      setValue,
      handleSubmit,
      control,
      onSubmit,
      onBlurHandler,
      buttonRef,
    } = useSliderHook({ value, min, step, max, onSubmit: props.onSubmit })

    useEffect(() => {
      setValue('min', minValue)
      setValue('max', maxValue)
    }, [minValue, maxValue])

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${s.wrapper} ${props.disabled} ${className}`}
        ref={ref}
      >
        <ControlledTextField
          className={s.field}
          control={control}
          name={'min'}
          disabled={props.disabled}
          onBlur={onBlurHandler}
          min={min}
          max={maxValue - step}
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
        <ControlledTextField
          className={s.field}
          control={control}
          name={'max'}
          disabled={props.disabled}
          onBlur={onBlurHandler}
          min={minValue + step}
          max={max}
        />

        <button type={'submit'} ref={buttonRef} aria-hidden />
      </form>
    )
  }
)
