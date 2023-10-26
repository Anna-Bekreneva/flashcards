import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { CustomRadioGroupProps, RadioGroup } from '@/components'

type ControlledRadioGroupProps<T extends FieldValues> = Pick<
  UseControllerProps<T>,
  'control' | 'name'
> &
  Omit<CustomRadioGroupProps, 'value' | 'onChange'>
export const ControlledRadioGroup = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledRadioGroupProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({ name, control })

  return <RadioGroup {...rest} value={value} onValueChange={onChange} />
}
