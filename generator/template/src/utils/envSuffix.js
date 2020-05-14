export default function getSuffix () {
  if (process.env.NODE_ENV === 'production') {
    return ''
  } else {
    return '_' + process.env.NODE_ENV
  }
}
