import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui'

import { TextField, ControlledCheckbox } from '@/components'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
  rememberMe: z.boolean().optional().default(false),
})

type FormValues = z.infer<typeof loginSchema>
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register('email')} label={'email'} errorMessage={errors.email?.message} />
      <TextField
        {...register('password')}
        label={'password'}
        errorMessage={errors.password?.message}
      />
      <ControlledCheckbox control={control} name={'rememberMe'} label={'Remember me'} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
