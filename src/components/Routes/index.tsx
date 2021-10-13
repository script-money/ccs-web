import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { IRouteType } from '../../config/routes.config'

import NotFound from '../../pages/NotFound.page'

export default function Routes({ routes }: any) {
  const renderRoutes = routes.map((route: IRouteType) => {
    const { path, component } = route
    return <Route path={path} component={component} key={path} exact />
  })

  return (
    <Switch>
      {renderRoutes}
      <Route component={NotFound} />
    </Switch>
  )
}
