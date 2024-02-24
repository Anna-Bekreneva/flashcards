type ArrayType = {
  name: string
  value: any
}
export const addFieldToFormData = (array: ArrayType[]) => {
  const formData = new FormData()

  for (let i = 0; i < array.length; i++) {
    array[i].value && formData.append(array[i].name, array[i].value)
  }

  return formData
}
