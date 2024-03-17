import { createRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ValuesSliderType } from '@/components'

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

type Props = {
  value: ValuesSliderType
  min: number
  max: number
  step: number
  onSubmit: (data: SliderFormValues) => void
}
export const useSliderHook = ({ value, min, max, step, onSubmit: onSubmitFromProps }: Props) => {
  const minValue = value[0]
  const maxValue = value[1]
  const { setValue, handleSubmit, control } = useForm<SliderFormValues>({
    resolver: zodResolver(sliderSchema(min, step, max, minValue, maxValue)),
    mode: 'onBlur',
  })

  const onSubmit = (data: SliderFormValues) => onSubmitFromProps(data)
  const onBlurHandler = () => buttonRef.current?.click()
  const buttonRef = createRef<HTMLButtonElement>()

  return { minValue, maxValue, setValue, handleSubmit, control, onSubmit, onBlurHandler, buttonRef }
}
