import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './AuthProvider'

function Providers(children: React.ReactNode) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">{children}</div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Providers
