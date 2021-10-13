import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './AuthProvider'
import { TxsProvider } from './TxsProvider'
import { UserProvider } from './UserProvider'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TxsProvider>
          <UserProvider>
            <div className="app">{children}</div>
          </UserProvider>
        </TxsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Providers
