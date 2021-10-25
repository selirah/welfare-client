import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router'
import { Layout } from 'antd'
import ResetPasswordForm from 'containers/auth/ResetPasswordForm'
import { ResendReset, User } from 'interfaces'
import { path } from 'helpers/path'
import bg from 'img/bg.png'
import { roles } from 'helpers/constants'
import { useStore } from 'hooks/StoreHook'
import { isUserLoggedIn, openNotification } from 'utils'

const { Content } = Layout

const ResetPassword = observer(() => {
  const { authStore } = useStore()

  const [initValues] = useState<ResendReset>({
    email: ''
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

  if (authStore.success && !authStore.user) {
    openNotification(
      'success',
      'Nice!',
      'A new temporal password has been send to you via SMS. Use it to login and change your password'
    )
    history.push(path.login)
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

  const onSubmit = (payload: ResendReset) => {
    authStore.resetPassword(payload)
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
        <ResetPasswordForm
          btnLoad={authStore.isSubmitting}
          error={authStore.error}
          onSubmit={onSubmit}
          values={initValues}
        />
      </Content>
    </Layout>
  )
})

export default ResetPassword
