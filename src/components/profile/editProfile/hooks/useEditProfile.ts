import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Enter new name'),
})

export type EditProfileFormType = z.infer<typeof schema>
export const useEditProfile = (onSubmit: (data: EditProfileFormType) => void, prevName: string) => {
  const { control, handleSubmit } = useForm<EditProfileFormType>({
    defaultValues: {
      name: prevName,
    },
    resolver: zodResolver(schema),
  })

  const handleFormSubmitted = handleSubmit(onSubmit)

  return { handleFormSubmitted, control }
}
