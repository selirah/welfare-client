import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import ResendCodeForm from 'containers/auth/ResendCodeForm'
import { ResendReset, User } from 'interfaces'
import { path } from 'helpers/path'
import bg from 'img/bg.png'
import { roles } from 'helpers/constants'
import { useStore } from 'hooks/StoreHook'
import { isUserLoggedIn, openNotification } from 'utils'

const { Content } = Layout

const ResendCode = observer(() => {
  const { authStore } = useStore()

  const [initValues] = useState<ResendReset>({
    email: ''
  })
  const history = useHistory()
  const [redirectToReferer, setRedirectToReferrer] = useState(false)

  useEffect(() => {
    if (isUserLoggedIn()) {
      const user = isUserLoggedIn()
      const usr: User = JSON.parse(user!)
      if (usr.token) {
        authStore.onSetUser(usr)
        setRedirectToReferrer(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (authStore.success && authStore.user) {
    openNotification(
      'success',
      'Nice!',
      'You have successfully reset code. Please enter code sent to you via SMS below to activate account'
    )
    history.push(path.verify)
  }

  if (redirectToReferer && authStore.user) {
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

  const onSubmit = (payload: ResendReset) => {
    authStore.resendCode(payload)
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
        <ResendCodeForm
          btnLoad={authStore.isSubmitting}
          error={authStore.error}
          onSubmit={onSubmit}
          values={initValues}
        />
      </Content>
    </Layout>
  )
})

export default ResendCode
