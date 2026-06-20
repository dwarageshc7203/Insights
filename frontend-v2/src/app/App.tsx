import { RouterProvider } from 'react-router'
import { router } from './routes.tsx'
import { ErrorBoundary } from '../components/common/ErrorBoundary'
import { AuthProvider } from '../providers/AuthProvider'

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  )
}