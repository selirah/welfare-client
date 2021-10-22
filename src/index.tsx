import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { isEmpty } from 'helpers/isEmpty'
import jwtDecode from 'jwt-decode'
import { path } from 'helpers/path'
import moment from 'moment'
import { authorization } from 'utils/authorization'
import Spinner from 'components/Spinner'

const user = localStorage.getItem('user')

if (user) {
  const { token } = JSON.parse(user)

  if (isEmpty(token)) {
    const user: any = jwtDecode(JSON.stringify({ token }))
    const d = new Date(0)
    d.setUTCSeconds(user.exp)
    const futureTime = moment(d).format('X')
    const currentTime = moment(new Date()).format('X')

    if (futureTime > currentTime) {
      authorization(token)
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      window.location.href = path.login
    }
  }
}

const LazyApp = lazy(() => import('./App'))

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <LazyApp />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
