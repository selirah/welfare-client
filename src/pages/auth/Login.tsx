import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import { Layout, Form, Alert } from 'antd'
import { Helmet } from 'react-helmet'
import LoginForm from 'containers/auth/LoginForm'
import { LoginFields, User } from 'interfaces'
import { AuthContext } from 'contexts'
import { path } from 'helpers/path'
import bg from 'img/bg.png'
import { constants, roles } from 'helpers/constants'

const Login = () => {
  const authContext = useContext(AuthContext)
  const [initValues] = useState<LoginFields>({
    email: '',
    password: ''
  })
  const [btnLoad, setBtnLoad] = useState(false)
  const [error, setError] = useState(null)
  const [form] = Form.useForm()
  const history = useHistory()
  const [redirectToReferer, setRedirectToReferrer] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { user } = authContext
    if (user) {
      setRedirectToReferrer(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { isSubmitting, error, user } = authContext
    setBtnLoad(isSubmitting)
    setError(error)
    if (user) {
      setUser(user)
      setRedirectToReferrer(true)
    }
  }, [])

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

  return (
    <Layout>
      <Helmet>Ebits Welfare | Login</Helmet>
    </Layout>
  )
}

export default Login
