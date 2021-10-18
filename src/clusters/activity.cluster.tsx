import { useRequest } from 'ahooks'
import { getActivityList } from '../api/server'
import { ActivityList } from '../components/ActivityList'
import React, { useState } from 'react'
import { categories, ICategoryType } from '../interface/activity'

export const ActivityCluster = () => {
  const [canVoteState, setCanVoteState] = useState<boolean>()
  const [canJoinState, setCanJoinState] = useState<boolean>()
  const [selectedCategory, setSelectedCategory] = useState<ICategoryType>(
    categories[0] as ICategoryType
  )
  const { data, loading, pagination } = useRequest(
    ({ current, pageSize }) =>
      getActivityList(
        current,
        pageSize, // should adjust reference screen height
        selectedCategory.type === 'All' ? undefined : selectedCategory.type,
        canVoteState ? true : undefined,
        canJoinState ? true : undefined
      ),
    {
      paginated: true,
      formatResult: i => {
        return { list: i.data, total: i.total }
      },
      refreshDeps: [canVoteState, canJoinState, selectedCategory],
      loadingDelay: 200
    }
  )

  return (
    <ActivityList
      isLoading={loading ?? true}
      activities={data === undefined ? [] : data.list}
      total={pagination.total}
      pageSize={10}
      currentPage={pagination.current}
      changeCurrent={pagination.changeCurrent}
      changeCanVoteState={value => setCanVoteState(value)}
      changeCanJoinState={value => setCanJoinState(value)}
      selectedCategory={selectedCategory}
      changeSelectType={setSelectedCategory}
    ></ActivityList>
  )
}
