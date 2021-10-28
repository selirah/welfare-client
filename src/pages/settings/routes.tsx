import { lazy, Suspense } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import Spinner from 'components/Spinner'

const routes = [
  {
    path: '',
    component: lazy(() => import('containers/settings/View')),
    exact: true
  },
  {
    path: 'add',
    component: lazy(() => import('containers/settings/Add')),
    exact: true
  },
  {
    path: 'edit',
    component: lazy(() => import('containers/settings/Edit')),
    exact: true
  }
]

const Routes = () => {
  const { url } = useRouteMatch()
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {routes.map((route, index) => (
          <Route exact={route.exact} key={index} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  )
}

export default Routes
