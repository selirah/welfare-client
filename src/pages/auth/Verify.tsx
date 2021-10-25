import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router'
import { Layout } from 'antd'
import VerifyForm from 'containers/auth/VerifyForm'
import { VerificationFields, User } from 'interfaces'
import { path } from 'helpers/path'
import bg from 'img/bg.png'
import { roles } from 'helpers/constants'
import { useStore } from 'hooks/StoreHook'
import { isUserLoggedIn, openNotification } from 'utils'

const { Content } = Layout

const Verify = observer(() => {
  const { authStore } = useStore()
  const [initValues] = useState<VerificationFields>(() => {
    if (isUserLoggedIn()) {
      const user = isUserLoggedIn()
      const usr: User = JSON.parse(user!)
      return {
        code: '',
        email: usr.email
      }
    } else {
      return {
        code: '',
        email: ''
      }
    }
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
      'You have successfully verified your account. Please login to proceed'
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

  const onSubmit = (payload: VerificationFields) => {
    authStore.verify(payload)
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
        <VerifyForm
          btnLoad={authStore.isSubmitting}
          error={authStore.error}
          onSubmit={onSubmit}
          values={initValues}
        />
      </Content>
    </Layout>
  )
})

export default Verify
