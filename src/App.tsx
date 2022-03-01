import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
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
const CalendarViewCluster = React.lazy(
  () => import('./clusters/calendarView.cluster')
)

const NotFound = React.lazy(() => import('./pages/NotFound.page'))
const InternalError = React.lazy(() => import('./pages/InternalError.page'))

function App() {
  return (
    <Router>
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
            <Route path="/calendar">
              <CalendarViewCluster />
            </Route>

            {/* @ts-ignore */}
            <Route exact path="/" component={ActivityCluster}></Route>
            {/* @ts-ignore */}
            <Route path="/404" component={NotFound} />
            {/* @ts-ignore */}
            <Route path="/error" component={InternalError} />
            <Redirect to="/404" />
          </Switch>
        </Providers>
      </Suspense>
    </Router>
  )
}

export default App
