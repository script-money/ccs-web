import React from 'react'
import Providers from './providers/Providers.comp'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ActivityCluster } from './clusters/activity.cluster'
import { CreateActivityCluster } from './clusters/create.cluster'
import { ActivityDetailCluster } from './clusters/activityDetail.cluster'
import NotFound from './pages/NotFound.page'

function App() {
  return (
    <Providers>
      <Switch>
        <Route path="/create-activity">
          <CreateActivityCluster />
        </Route>
        <Route path="/activity/:id">
          <ActivityDetailCluster />
        </Route>

        <Route exact path="/">
          <ActivityCluster />
        </Route>

        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Providers>
  )
}

export default App
