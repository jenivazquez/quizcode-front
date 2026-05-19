import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '../shared/context/AuthProvider'
import { router } from './routes/router'

const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)

export default App