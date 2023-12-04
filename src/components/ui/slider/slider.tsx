import { createRef, forwardRef, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import * as RadixSlider from '@radix-ui/react-slider'
import { SliderProps } from '@radix-ui/react-slider'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './slider.module.scss'

import { ControlledTextField } from '@/components'

type Props = {
  value: [number, number]
  className?: string
  changeMaxValueHandler?: (value: string) => void
  changeMinValueHandler?: (value: string) => void
  onSubmit: (data: SliderFormValues) => void
} & SliderProps

export type SliderFormValues = z.infer<ReturnType<typeof sliderSchema>>
const sliderSchema = (
  min: number,
  step: number,
  max: number,
  minValue: number,
  maxValue: number
) => {
  return z.object({
    min: z.coerce
      .number()
      .min(min, `Not less than ${min}`)
      .max(maxValue - step, `Not more than ${maxValue - step}`),
    max: z.coerce
      .number()
      .min(minValue + step, `Not less than ${minValue + step}`)
      .max(max, `Not more than ${max}`),
  })
}

export const Slider = forwardRef<HTMLFormElement, Props>(
  ({ min = 0, max = 100, step = 1, value, className, ...props }, ref?) => {
    const minValue = value[0]
    const maxValue = value[1]

    useEffect(() => {
      setValue('min', minValue)
      setValue('max', maxValue)
    }, [minValue, maxValue])

    const { setValue, handleSubmit, control } = useForm<SliderFormValues>({
      resolver: zodResolver(sliderSchema(min, step, max, minValue, maxValue)),
      mode: 'onBlur',
    })

    const onSubmit = (data: SliderFormValues) => props.onSubmit(data)
    const onBlurHandler = () => buttonRef.current?.click()
    const buttonRef = createRef<HTMLButtonElement>()

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
          max={max - step}
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
          min={min + step}
          max={max}
        />

        <button type={'submit'} ref={buttonRef} aria-hidden />
      </form>
    )
  }
)
