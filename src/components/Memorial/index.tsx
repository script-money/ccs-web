import moment from 'moment'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { MemorialsData } from '../../interface/memorials'
import { classNames } from '../../utils'

interface MemorialProp {
  data: MemorialsData
}

classNames

export const Memorial = ({ data }: MemorialProp) => {
  const history = useHistory()

  return (
    <div className="">
      <div className="flex flex-col max-w-max">
        <a
          className={classNames(
            'w-60',
            'h-60',
            data.isPositive ? 'shadow' : 'bg-black'
          )}
          onClick={() => {
            history.push('/activity/' + data.activity.id)
          }}
        >
          <div
            className={classNames(
              'overflow-hidden',
              'p-2',
              'text-xs',
              data.isPositive ? '' : 'text-white',
              'whitespace-nowrap'
            )}
          >
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
    </div>
  )
}
