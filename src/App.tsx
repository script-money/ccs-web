import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Loading } from './components/Loading'
const Providers = React.lazy(() => import('./providers/Providers.comp'))
const ActivityCluster = React.lazy(() => import('./clusters/activity.cluster'))
const CreateActivityCluster = React.lazy(
  () => import('./clusters/activityCreate.cluster')
)
const ActivityDetailCluster = React.lazy(
  () => import('./clusters/activityDetail.cluster')
)
const UpdateActivityCluster = React.lazy(
  () => import('./clusters/activityUpdate.cluster')
)
const MemorialsCluster = React.lazy(
  () => import('./clusters/memorials.cluster')
)
const NotFound = React.lazy(() => import('./pages/NotFound.page'))

function App() {
  return (
    <>
      <Suspense fallback={<Loading></Loading>}>
        <Providers>
          <Switch>
            <Route path="/create-activity">
              <CreateActivityCluster />
            </Route>
            <Route path="/activity/:id">
              <ActivityDetailCluster />
            </Route>
            <Route path="/update-activity/:id">
              <UpdateActivityCluster />
            </Route>
            <Route path="/momerials">
              <MemorialsCluster />
            </Route>

            <Route exact path="/" component={ActivityCluster}></Route>

            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </Providers>
      </Suspense>
    </>
  )
}

export default App
