import { useState, useEffect } from 'react'
import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'
import { Layout } from 'antd'
import RegisterForm from 'containers/auth/RegisterForm'
import { RegisterFields, User } from 'interfaces'
import { path } from 'helpers/path'
import bg from 'img/bg.png'
import { roles } from 'helpers/constants'
import { useStore } from 'hooks/StoreHook'
import { isUserLoggedIn, openNotification } from 'utils'

const { Content } = Layout

const pathLocation = localStorage.getItem('location')

const Register = observer(() => {
  const { authStore } = useStore()
  const [initValues] = useState<RegisterFields>({
    email: '',
    password: '',
    agree: false,
    confirm_password: '',
    name: '',
    phone: ''
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

  useEffect(() => {
    autorun(() => {
      if (authStore.user && authStore.success) {
        openNotification(
          'success',
          'Nice!',
          'You have successfully registered. Enter the code that was sent to you via email and sms into the box below to verify your account.This code expires after 24 hours'
        )
        history.push(path.verify)
      }
    })
  }, [history, authStore])

  const onSubmit = (payload: RegisterFields) => {
    authStore.register(payload)
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
        <RegisterForm
          btnLoad={authStore.isSubmitting}
          error={authStore.error}
          onSubmit={onSubmit}
          values={initValues}
        />
      </Content>
    </Layout>
  )
})

export default Register
