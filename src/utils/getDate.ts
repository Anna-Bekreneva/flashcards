export const getDate = (dateTime: string) => {
  const date: Date = new Date(dateTime)

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
