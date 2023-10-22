import { useController, UseControllerProps, FieldValues } from 'react-hook-form'

import { Checkbox, CheckboxCustomProps } from '@/components/ui/checkbox'

export type ControlledCheckboxProps<T extends FieldValues> = Pick<
  UseControllerProps<T>,
  'control' | 'name'
> &
  Omit<CheckboxCustomProps, 'checked' | 'onCheckedChange'>
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
