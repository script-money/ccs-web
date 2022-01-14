import React from 'react'
import { MemorialsData } from '../../interface/memorials'
import { Memorial } from '../Memorial'

interface MemorialsListProp {
  data: MemorialsData[] | null
}

const MemorialsList = ({ data }: MemorialsListProp) => {
  const NoActivities = (
    <div className="flex overflow-hidden fixed top-0 right-0 bottom-0 left-0 z-0 flex-col justify-center items-center w-full h-scree">
      <h2 className="text-xl font-semibold text-center text-gray-500">
        No memorials found
      </h2>
    </div>
  )

  if (data === null) {
    return <>{NoActivities}</>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center px-4 sm:px-6 lg:px-20 mt-4">
      {data.map((memorialData, index) => {
        return <Memorial key={index} data={memorialData}></Memorial>
      })}
    </div>
  )
}

export default MemorialsList
