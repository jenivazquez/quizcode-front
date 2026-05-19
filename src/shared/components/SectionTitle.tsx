import { Box, Divider, Typography } from '@mui/material'

interface SectionTitleProps {
  icon: React.ReactNode;
  title: string;
}

const SectionTitle = ({ icon, title }: SectionTitleProps) => (
  <>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
      <Box sx={{ color: 'primary.main', display: 'flex', fontSize: 28 }}>{icon}</Box>
      <Typography variant="h6">{title}</Typography>
    </Box>
    <Divider sx={{ mb: 5 }} />
  </>
)

export default SectionTitle
