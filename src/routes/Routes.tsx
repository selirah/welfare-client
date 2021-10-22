import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import Login from 'pages/auth/Login'
import Home from 'pages/home'
import { path } from '../helpers/path'

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={path.login} component={Login} />
        <PrivateRoute exact path={path.home} component={Home} />
      </Switch>
    </Router>
  )
}

export default Routes
