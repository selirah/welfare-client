import React from 'react'
import { Row, Col, Form, Input, Button, Alert, Typography } from 'antd'
import { LoginFields } from 'interfaces'
import { path } from 'helpers/path'

interface LoginFormProps {
  values: LoginFields
  onSubmit(values: LoginFields): void
  btnLoad: boolean
  error: string | null
}

const { Link, Title } = Typography

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { btnLoad, error, onSubmit, values } = props

  const renderError = (error: any) => (
    <Alert
      type="error"
      message={error.message}
      style={{ marginBottom: '10px' }}
    />
  )

  return (
    <Row
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '150px'
      }}
    >
      <Col
        className="auth-form-container"
        style={{
          background: '#fff',
          padding: '1rem',
          borderRadius: '0.2rem',
          boxShadow: '0 .5rem 1rem rgba(255,203,170,.25)'
        }}
        sm={12}
        lg={6}
        md={12}
      >
        <Title level={3} style={{ fontWeight: 700, color: '#7367f0' }}>
          Login
        </Title>
        {error ? renderError(error) : null}
        <Form
          layout="vertical"
          name="basic"
          initialValues={values}
          onFinish={onSubmit}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!'
              },
              {
                type: 'email',
                message: 'Enter a valid email address in the form john@doe.com'
              }
            ]}
            hasFeedback
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col span={12}>
              <Link href={path.reset} strong>
                Forgotten Password
              </Link>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Link href={path.resend} strong>
                Resend Code
              </Link>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={btnLoad}>
              {btnLoad ? 'Processing..' : 'Login'}
            </Button>
          </Form.Item>
          <Row style={{ marginTop: '1.5rem' }}>
            <Col span={24}>
              No account yet?{' '}
              <Link href={path.register} strong>
                Sign Up
              </Link>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default LoginForm
