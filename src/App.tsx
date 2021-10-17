import React from 'react'
import Providers from './providers/Providers.comp'
import { Switch, Route } from 'react-router-dom'
import { ActivityCluster } from './clusters/activity.cluster'
import { CreateActivityCluster } from './clusters/create.cluster'

function App() {
  return (
    <Providers>
      <Switch>
        <Route path="/create-activity">
          <CreateActivityCluster />
        </Route>
        <Route path="/">
          <ActivityCluster />
        </Route>
      </Switch>
    </Providers>
  )
}

export default App
