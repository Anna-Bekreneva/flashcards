export const calcRating = (grade: number): string[] => {
  const array: string[] = []

  for (let i = 0; i < grade; i++) {
    array.push('fill')
  }

  if (array.length < 5) {
    for (let i = array.length; i < 5; i++) {
      array.push('stroke')
    }
  }

  return array
}
