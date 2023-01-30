export default function copyClipboard(value) {
  const ta = document.createElement('textarea')
  ta.value = value ?? ''
  ta.style.position = 'absolute'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  document.execCommand('copy')
  ta.remove()
}
