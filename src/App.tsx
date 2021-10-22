import { Fragment } from 'react'
import { AuthContextProvider } from 'contexts'
import Routes from 'routes/Routes'

const App = () => {
  return (
    <Fragment>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </Fragment>
  )
}

export default App
