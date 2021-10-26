import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import LoginForm from 'containers/auth/LoginForm'
import { LoginFields, User } from 'interfaces'
import { path } from 'helpers/path'
import bg from 'img/bg.png'
import { roles } from 'helpers/constants'
import { useStore } from 'hooks/StoreHook'
import { isUserLoggedIn } from 'utils'

const { Content } = Layout

const pathLocation = localStorage.getItem('location')

const Login = observer(() => {
  const { authStore } = useStore()
  const [initValues] = useState<LoginFields>({
    email: '',
    password: ''
  })
  const history = useHistory()

  useEffect(() => {
    if (isUserLoggedIn()) {
      const user = isUserLoggedIn()
      const usr: User = JSON.parse(user!)
      if (usr.token) {
        authStore.onSetUser(usr)
        switch (usr.role) {
          case roles.ADMIN:
            history.push(pathLocation ? pathLocation : path.home)
            break
          case roles.SUPER:
            history.push(pathLocation ? pathLocation : path.clients)
            break
          case roles.USER:
            history.push(pathLocation ? pathLocation : path.home)
            break
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (authStore.success && authStore.user) {
    const { role } = authStore.user
    switch (role) {
      case roles.ADMIN:
        return <Redirect push to={path.home} />
      case roles.SUPER:
        return <Redirect push to={path.clients} />
      case roles.USER:
        return <Redirect push to={path.home} />
      default:
        return <Redirect push to={path.home} />
    }
  }

  const onSubmit = (payload: LoginFields) => {
    authStore.login(payload)
  }

  return (
    <Layout>
      <Content
        style={{
          background: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}
      >
        <LoginForm
          btnLoad={authStore.isSubmitting}
          error={authStore.error}
          onSubmit={onSubmit}
          values={initValues}
        />
      </Content>
    </Layout>
  )
})

export default Login
