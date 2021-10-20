import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './AuthProvider'
import { UserProvider } from './UserProvider'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <div className="app">{children}</div>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Providers
