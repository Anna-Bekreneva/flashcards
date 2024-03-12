import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signUpSchema = z
  .object({
    email: z.string().email('Invalid email'),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignUpFormValues = z.infer<typeof signUpSchema>
export const useSignUp = (onSubmit: (data: SignUpFormValues) => void) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormValues>({ resolver: zodResolver(signUpSchema) })

  const handleFormSubmitted = handleSubmit(onSubmit)

  return { handleFormSubmitted, control, errors }
}
