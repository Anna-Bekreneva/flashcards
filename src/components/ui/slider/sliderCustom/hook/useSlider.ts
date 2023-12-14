import { ValuesSliderType } from '@/components'

export const useSlider = (
  onValueCommit: ((values: ValuesSliderType) => void) | undefined,
  min: number,
  step: number,
  max: number,
  minValue: number,
  maxValue: number
) => {
  const changeMinValueHandler = (value: string) => {
    const minValue = Number(value)

    if ((minValue > min || minValue === min) && minValue < maxValue) {
      onValueCommit?.([minValue, maxValue])
    } else if (minValue < min) {
      onValueCommit?.([min, maxValue])
    } else if (minValue > maxValue || minValue === maxValue) {
      onValueCommit?.([maxValue - step, maxValue])
    }
  }
  const changeMaxValueHandler = (value: string) => {
    const maxValue = Number(value)

    if ((maxValue < max || maxValue === max) && maxValue > minValue) {
      onValueCommit?.([minValue, maxValue])
    } else if (maxValue > max) {
      onValueCommit?.([minValue, max])
    } else if (maxValue < minValue || maxValue === minValue) {
      onValueCommit?.([minValue, minValue + step])
    }
  }

  return { changeMinValueHandler, changeMaxValueHandler }
}
