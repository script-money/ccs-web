import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './AuthProvider'
import TxProvider from './TxProvider'
import { UserProvider } from './UserProvider'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <TxProvider>
        <AuthProvider>
          <UserProvider>
            <div className="app">{children}</div>
          </UserProvider>
        </AuthProvider>
      </TxProvider>
    </BrowserRouter>
  )
}

export default Providers
