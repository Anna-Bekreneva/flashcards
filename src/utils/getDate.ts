export const getDate = (dateTime: string) => {
  const date: Date = new Date(dateTime)

  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}
