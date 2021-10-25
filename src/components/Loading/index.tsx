import React from 'react'
import logo from '../../images/cryptochasers.png'

export const Loading = () => {
  return (
    <div className="flex overflow-hidden fixed top-0 right-0 bottom-0 left-0 z-50 justify-center items-center w-full h-scree">
      <img className="w-8 h-8 animate-bounce" src={logo} />
    </div>
  )
}
