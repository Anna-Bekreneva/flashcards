import { useController, UseControllerProps, FieldValues } from 'react-hook-form'

import { Checkbox, CustomCheckboxProps } from '@/components'

type ControlledCheckboxProps<T extends FieldValues> = Pick<
  UseControllerProps<T>,
  'control' | 'name'
> &
  Omit<CustomCheckboxProps, 'id' | 'checked' | 'onCheckedChange'>
export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledCheckboxProps<T>) => {
  const {
    field: { value, onChange, ref, disabled },
  } = useController({ name, control })

  return (
    <Checkbox
      {...rest}
      checked={value}
      onCheckedChange={onChange}
      ref={ref}
      name={name}
      id={name}
      disabled={disabled}
    ></Checkbox>
  )
}
