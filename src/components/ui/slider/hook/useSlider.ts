export const useSlider = (
  onValueChange: ((values: [number, number]) => void) | undefined,
  min: number,
  step: number,
  max: number,
  minValue: number,
  maxValue: number
) => {
  const changeMinValueHandler = (value: string) => {
    const minValue = Number(value)

    if ((minValue > min || minValue === min) && minValue < maxValue) {
      onValueChange?.([minValue, maxValue])
    } else if (minValue < min) {
      onValueChange?.([min, maxValue])
    } else if (minValue > maxValue || minValue === maxValue) {
      onValueChange?.([maxValue - step, maxValue])
    }
  }
  const changeMaxValueHandler = (value: string) => {
    const maxValue = Number(value)

    if ((maxValue < max || maxValue === max) && maxValue > minValue) {
      onValueChange?.([minValue, maxValue])
    } else if (maxValue > max) {
      onValueChange?.([minValue, max])
    } else if (maxValue < minValue || maxValue === minValue) {
      onValueChange?.([minValue, minValue + step])
    }
  }

  return { changeMinValueHandler, changeMaxValueHandler }
}
