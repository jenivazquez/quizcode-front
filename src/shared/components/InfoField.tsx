import { Typography } from '@mui/material'

interface InfoFieldProps {
  label: string;
  value: string;
}

const InfoField = ({ label, value }: InfoFieldProps) => (
  <>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>{label}</Typography>
    <Typography variant="body1">{value}</Typography>
  </>
)

export default InfoField
