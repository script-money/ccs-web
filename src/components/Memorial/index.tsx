import moment from 'moment'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { MemorialsData } from '../../interface/memorials'

interface MemorialProp {
  data: MemorialsData
}

export const Memorial = ({ data }: MemorialProp) => {
  const history = useHistory()

  return (
    <div className="">
      {!data.isPositive ? (
        <div className="flex flex-col max-w-max">
          <a className="w-60 h-60 bg-black" href={'/activity/' + data.activity}>
            <div className="overflow-hidden p-2 text-xs text-white whitespace-nowrap">
              <p>Title: {data.activity.title}</p>
              <p>startDate: {moment(data.activity.startDate).format('L')}</p>
              <p>endDate: {moment(data.activity.endDate).format('L')}</p>
              <p>
                categories:{' '}
                {data.activity.categories
                  .map(item => {
                    return item.category.type
                  })
                  .join(' ')}
              </p>
              <p>mintedAt: {moment(data.mintedAt).format('L')}</p>
              <p>bonus: {data.bonus}</p>
            </div>
          </a>
          <div className="flex justify-center text-md">
            <p className="self-center">
              #{data.seriesNumber}/{data.circulatingCount}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col max-w-max">
          <a
            className="w-60 h-60 shadow"
            onClick={() => {
              history.push('/activity/' + data.activity.id)
            }}
          >
            <div className="overflow-hidden p-2 text-xs whitespace-nowrap">
              <p>Title: {data.activity.title}</p>
              <p>startDate: {moment(data.activity.startDate).format('L')}</p>
              <p>
                endDate:{' '}
                {data.activity.endDate === null
                  ? 'TBD'
                  : moment(data.activity.endDate).format('L')}
              </p>
              <p>
                categories:{' '}
                {data.activity.categories
                  .map(item => {
                    return item.category.type
                  })
                  .join(' ')}
              </p>
              <p>mintedAt: {moment(data.mintedAt).format('L')}</p>
              <p>bonus: {data.bonus}</p>
            </div>
          </a>
          <div className="flex justify-center text-md">
            <p className="self-center">
              #{data.seriesNumber}/{data.circulatingCount}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
