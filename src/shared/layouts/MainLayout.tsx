import { Box } from '@mui/material'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Suspense } from 'react'
import PageLoader from '../components/PageLoader'

const MainLayout = () => (
  <>
    <ScrollRestoration />
    <Navbar />
    <Box sx={{ minHeight: 'calc(100vh - 64px)' }}>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Box>
  </>
)

export default MainLayout
