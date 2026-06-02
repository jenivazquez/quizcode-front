import { Alert } from '@mui/material'
import { useState, useEffect } from 'react'

interface ErrorAlertProps {
  message: string | null
  severity?: 'error' | 'warning' | 'info' | 'success'
}

const ErrorAlert = ({ message, severity = 'error' }: ErrorAlertProps) => {

  const [closed, setClosed] = useState<boolean>(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { if (message) setClosed(false)}, [message])

  if (closed || !message) return null
  return (
    <Alert severity={severity} sx={{ width: '100%' }} onClose={() => setClosed(true)}>
      {message}
    </Alert>
  )
}

export default ErrorAlert
