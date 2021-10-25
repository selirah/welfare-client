import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router'
import { Layout } from 'antd'
import LoginForm from 'containers/auth/LoginForm'
import { LoginFields, User } from 'interfaces'
import { path } from 'helpers/path'
import bg from 'img/bg.png'
import { roles } from 'helpers/constants'
import { useStore } from 'hooks/StoreHook'
import { isUserLoggedIn } from 'utils'

const { Content } = Layout

const Login = observer(() => {
  const { authStore } = useStore()
  const [initValues] = useState<LoginFields>({
    email: '',
    password: ''
  })
  const history = useHistory()
  const [redirectToReferer, setRedirectToReferrer] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (isUserLoggedIn()) {
      const user = isUserLoggedIn()
      const usr: User = JSON.parse(user!)
      if (usr.token) {
        setUser(usr)
        setRedirectToReferrer(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (authStore.success && authStore.user) {
    setUser(user)
    setRedirectToReferrer(true)
  }

  if (redirectToReferer && user) {
    const { role } = user
    switch (role) {
      case roles.ADMIN:
        history.push(path.home)
        break
      case roles.SUPER:
        history.push(path.clients)
        break
      case roles.USER:
        history.push(path.home)
        break
      default:
        history.push(path.home)
        break
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
