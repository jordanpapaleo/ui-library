export const sortByObjKey = (key) => (a, b) => {
  const textA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
  const textB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
}
