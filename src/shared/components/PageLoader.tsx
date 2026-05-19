import { Box, CircularProgress } from '@mui/material'

const PageLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}>
    <CircularProgress size={60} />
  </Box>
)

export default PageLoader
