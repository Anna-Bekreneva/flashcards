type ArrayType = {
  name: string
  something: any
}
export const addFieldWIthFormData = (array: ArrayType[]) => {
  const formData = new FormData()

  for (let i = 0; i < array.length; i++) {
    array[i].something && formData.append(array[i].name, array[i].something)
  }

  return formData
}
