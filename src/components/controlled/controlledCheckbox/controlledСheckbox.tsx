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
    field: { onChange, value, ...field },
  } = useController({ name, control })

  return (
    <Checkbox {...rest} {...field} checked={value} onCheckedChange={onChange} id={name}></Checkbox>
  )
}
