export const formatTime = (seconds: number) => {
  const hour = Math.floor(seconds / 3600).toString().padStart(2, '0')
  const min = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
  const sec = (seconds % 60).toString().padStart(2, '0')
  return `${hour}:${min}:${sec}`
}
