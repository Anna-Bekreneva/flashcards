type ArrayType = {
  name: string
  // todo: correct any
  value: any
}
export const addFieldToFormData = (array: ArrayType[]) => {
  const formData = new FormData()

  for (let i = 0; i < array.length; i++) {
    if (array[i].value === 'empty') {
      formData.append(array[i].name, '')
    } else {
      array[i].value && formData.append(array[i].name, array[i].value)
    }
  }

  return formData
}
