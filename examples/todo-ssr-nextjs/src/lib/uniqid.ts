export function uniqid() {
  return (
    Date.now().toString(36) +
    (Math.floor(Math.random() * 10e11) + 10e11).toString(32).slice(0, 5)
  )
}
