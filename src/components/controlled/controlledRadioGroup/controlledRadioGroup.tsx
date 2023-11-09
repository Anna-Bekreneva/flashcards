import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { CustomRadioGroupProps, RadioGroup } from '@/components'

type ControlledRadioGroupProps<T extends FieldValues> = Pick<
  UseControllerProps<T>,
  'control' | 'name'
> &
  Omit<CustomRadioGroupProps, 'id' | 'value' | 'onChange'>
export const ControlledRadioGroup = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledRadioGroupProps<T>) => {
  const {
    field: { value, onChange, ref, disabled },
  } = useController({ name, control })

  return (
    <RadioGroup
      {...rest}
      id={name}
      value={value}
      name={name}
      onValueChange={onChange}
      ref={ref}
      disabled={disabled}
    />
  )
}
