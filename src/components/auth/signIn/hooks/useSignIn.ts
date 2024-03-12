import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
  rememberMe: z.boolean().optional().default(false),
})

export type SignInFormValues = z.infer<typeof loginSchema>
export const useSignIn = (onSubmit: (data: SignInFormValues) => void) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormValues>({ resolver: zodResolver(loginSchema) })

  const handleFormSubmitted = handleSubmit(onSubmit)

  return { control, errors, handleFormSubmitted }
}
