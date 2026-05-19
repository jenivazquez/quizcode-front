import { Box, TextField, Typography, IconButton, Divider, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import type { UseFormRegisterReturn, FieldError } from 'react-hook-form'

const NO_UNDERLINE = {
  '& .MuiInput-underline:before': { borderBottom: 'none' },
  '& .MuiInput-underline:after': { borderBottom: 'none' },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
}

interface RadioOptionProps {
  letter: string
  isValid: boolean
  onChangeValid: () => void
  onRemove: () => void
  removeDisabled: boolean
  register: UseFormRegisterReturn
  fieldError?: FieldError
}

const RadioOption = ({ letter, isValid, onChangeValid, onRemove, removeDisabled, register, fieldError }: RadioOptionProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1, py: 0.5, 
      borderRadius: 1.5, border: '1px solid', borderColor: isValid ? 'success.main' : 'divider', borderLeftWidth: 7, borderLeftColor: isValid ? 'success.main' : 'divider', 
      bgcolor: isValid ? 'success.50' : 'transparent', transition: 'all 0.15s' }}>

      <Tooltip title="Opción correcta" placement="left">
        <IconButton size="small" onClick={onChangeValid}>
          {isValid ? <CheckCircleIcon sx={{ color: 'success.main' }} /> : <RadioButtonUncheckedIcon sx={{ color: 'text.disabled' }} />}
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      <Typography variant="subtitle1" fontWeight={700} color="text.secondary" sx={{ minWidth: 24 }}>
        {letter}.
      </Typography>

      <TextField
        fullWidth
        variant="standard"
        placeholder={`Opción ${letter}`}
        {...register}
        error={!!fieldError}
        helperText={fieldError?.message}
        sx={NO_UNDERLINE}
      />

      <IconButton size="small" color="error" onClick={onRemove} disabled={removeDisabled}>
        <DeleteIcon fontSize="small" />
      </IconButton>

    </Box>
  )
}

export default RadioOption
