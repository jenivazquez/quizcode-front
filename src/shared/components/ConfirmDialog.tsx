import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmDialog = ({ open, title, message, loading, onConfirm, onClose }: ConfirmDialogProps) => (

  <Dialog open={open} onClose={onClose} slotProps={{ paper: { sx: { borderRadius: 3, p: 3 } } }}>

    <DialogTitle sx={{ textAlign: 'center'}}>
      {title}
    </DialogTitle>

    <DialogContent sx={{ textAlign: 'center'}}>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    
    <DialogActions sx={{ justifyContent: 'center', gap: 1 }}>
      <Button variant="outlined" size="large" disabled={loading} onClick={onClose}>Cancelar</Button>
      <Button variant="contained" size="large" disabled={loading} onClick={onConfirm} color="error">Confirmar</Button>
    </DialogActions>

  </Dialog>

)

export default ConfirmDialog
