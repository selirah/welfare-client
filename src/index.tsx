import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import jwtDecode from 'jwt-decode'
import { path } from 'helpers/path'
import moment from 'moment'
import { authorization } from 'utils/authorization'
import Spinner from 'components/Spinner'
import { StoreContextProvider } from 'contexts/StoreContext'

const token = localStorage.getItem('token')

if (token) {
  const decode: any = jwtDecode(JSON.stringify({ token }))
  const d = new Date(0)
  d.setUTCSeconds(decode.exp)
  const futureTime = moment(d).format('X')
  const currentTime = moment(new Date()).format('X')

  if (futureTime > currentTime) {
    authorization(JSON.parse(token))
  } else {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    window.location.href = path.login
  }
}

const LazyApp = lazy(() => import('./App'))

ReactDOM.render(
  <React.Fragment>
    <Suspense fallback={<Spinner />}>
      <StoreContextProvider>
        <LazyApp />
      </StoreContextProvider>
    </Suspense>
  </React.Fragment>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
