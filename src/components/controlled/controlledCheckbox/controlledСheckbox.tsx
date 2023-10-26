import { useController, UseControllerProps, FieldValues } from 'react-hook-form'

import { Checkbox, CustomCheckboxProps } from '@/components'

export type ControlledCheckboxProps<T extends FieldValues> = Pick<
  UseControllerProps<T>,
  'control' | 'name'
> &
  Omit<CustomCheckboxProps, 'checked' | 'onCheckedChange'>
export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledCheckboxProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({ name, control })

  return <Checkbox {...rest} checked={value} onCheckedChange={onChange} id={name}></Checkbox>
}
