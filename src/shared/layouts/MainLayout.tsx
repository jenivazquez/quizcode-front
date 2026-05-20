import { Box } from '@mui/material'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Suspense } from 'react'
import PageLoader from '../components/PageLoader'

const MainLayout = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <ScrollRestoration />
    <Navbar />
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Box>
  </Box>
)

export default MainLayout
