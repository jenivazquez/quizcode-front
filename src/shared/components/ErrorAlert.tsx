import { Alert } from '@mui/material'

interface ErrorAlertProps {
  message: string | null;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  if (!message) return null
  return <Alert severity="error" sx={{ mb: 2 }}>{message}</Alert>
}

export default ErrorAlert
