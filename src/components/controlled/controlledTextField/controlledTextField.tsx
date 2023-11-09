import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components'

type ControlledTextFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & Omit<TextFieldProps, 'id' | 'onChange' | 'value'>

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledTextFieldProps<T>) => {
  const {
    field: { onChange, onBlur, value, ref, disabled },
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return (
    <TextField
      {...rest}
      onValueChange={onChange}
      value={value}
      onBlur={onBlur}
      name={name}
      ref={ref}
      disabled={disabled}
      errorMessage={error?.message}
      id={name}
    />
  )
}
