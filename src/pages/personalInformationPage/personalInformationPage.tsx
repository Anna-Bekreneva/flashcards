import { PersonalInformation, Preloader, ProgressBar } from '@/components'
import { useMeQuery, useUpdateMeMutation } from '@/services'

export const PersonalInformationPage = () => {
  const { data, isLoading, isFetching } = useMeQuery()

  const [updateMe, { isLoading: isLoadingUpdate }] = useUpdateMeMutation()

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      {(isFetching || isLoadingUpdate) && <ProgressBar />}
      <section className={'page-modal'}>
        <PersonalInformation
          userName={data?.name}
          avatar={data?.avatar}
          email={data?.email || ''}
          onUserDataChange={updateMe}
        />
      </section>
    </>
  )
}
