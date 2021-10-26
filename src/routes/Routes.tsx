import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Login from 'pages/auth/Login'
import Home from 'pages/home'
import Register from 'pages/auth/Register'
import Verify from 'pages/auth/Verify'
import ResendCode from 'pages/auth/ResendCode'
import ResetPassword from 'pages/auth/ResetPassword'
import Settings from 'pages/settings/index'
import { path } from 'helpers/path'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={path.login} component={Login} />
        <Route exact path={path.register} component={Register} />
        <Route exact path={path.verify} component={Verify} />
        <Route exact path={path.resend} component={ResendCode} />
        <Route exact path={path.reset} component={ResetPassword} />
        <PrivateRoute exact path={path.home} component={Home} />
        <PrivateRoute path={path.settings} component={Settings} />
      </Switch>
    </Router>
  )
}

export default Routes
