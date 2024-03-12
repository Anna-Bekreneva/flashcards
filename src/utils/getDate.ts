export const getDate = (dateTime: string) => {
  return new Date(dateTime).toLocaleDateString('ru-RU')
}
