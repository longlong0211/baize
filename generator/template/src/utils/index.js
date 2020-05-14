export function removeEmptyValue (obj) {
  const res = {}
  if (!obj) return res
  for (const [key, value] of Object.entries(obj)) {
    if (value !== '' && value !== null) res[key] = value
  }
  return res
}

export function open (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}
