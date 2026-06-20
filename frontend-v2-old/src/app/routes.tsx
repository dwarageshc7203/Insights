import { createBrowserRouter } from 'react-router'
import LandingPage from './pages/landing/LandingPage'
import AuthPage from './pages/auth/AuthPage'
import WorkspacePage from './pages/workspace/WorkspacePage'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

export const router = createBrowserRouter([
  { path: '/', Component: LandingPage },
  { path: '/auth', Component: AuthPage },
  { 
    path: '/workspace', 
    element: <ProtectedRoute><WorkspacePage /></ProtectedRoute> 
  },
])
