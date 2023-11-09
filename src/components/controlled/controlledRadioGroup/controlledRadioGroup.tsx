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
    field: { onChange, ...field },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <RadioGroup
      {...rest}
      {...field}
      id={name}
      onValueChange={onChange}
      errorMessage={error?.message}
    />
  )
}
