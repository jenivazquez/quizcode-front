import { Snackbar, Alert } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { SNACKBAR_DURATION } from '../constants/constants'

interface SuccessSnackbarProps {
  open: boolean;
  message: string;
}

const SuccessSnackbar = ({ open, message }: SuccessSnackbarProps) => (
  <Snackbar open={open} autoHideDuration={SNACKBAR_DURATION} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    sx={{ minWidth: 400 }}>
    <Alert severity="success" icon={<CheckCircleIcon/>} variant="filled"
      sx={{ width: '100%', minHeight: 80, fontSize: 20, px: 3, alignItems: 'center', justifyContent: 'center' }}>
      {message}
    </Alert>
  </Snackbar>
)

export default SuccessSnackbar
