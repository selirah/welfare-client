import React from 'react'
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Alert,
  Typography,
  Checkbox
} from 'antd'
import { RegisterFields } from 'interfaces'
import { path } from 'helpers/path'

interface RegisterFormProps {
  values: RegisterFields
  onSubmit(values: RegisterFields): void
  btnLoad: boolean
  error: string | null
}

const { Link, Title } = Typography

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
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
        marginTop: '70px'
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
          Sign up
        </Title>
        {error ? renderError(error) : null}
        <Form
          layout="vertical"
          name="basic"
          initialValues={values}
          onFinish={onSubmit}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your full name!'
              },
              {
                min: 5,
                message: 'Name should have at least 5 characters'
              }
            ]}
            hasFeedback
          >
            <Input placeholder="Full name" />
          </Form.Item>
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
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input phone number in the form 02XXXXXXXX'
              },
              {
                min: 10,
                message: 'Phone number must be 10 numbers'
              },
              {
                max: 10,
                message: 'Phone number must be 10 numbers'
              }
            ]}
            hasFeedback
          >
            <Input placeholder="Phone in the form 02XXXXXXXX. Only one phone number" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            dependencies={['password']}
            name="confirm_password"
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    'The two passwords that you entered do not match!'
                  )
                }
              })
            ]}
          >
            <Input.Password placeholder="Confirm Password." />
          </Form.Item>
          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: 'Please agree to terms and conditions'
              }
            ]}
            hasFeedback
          >
            <Checkbox>
              I agree to{' '}
              <Link href={path.terms} strong>
                terms and conditions
              </Link>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={btnLoad}>
              {btnLoad ? 'Processing..' : 'Register'}
            </Button>
          </Form.Item>
          <Row style={{ marginTop: '1.5rem' }}>
            <Col span={24}>
              <p>
                Already has an account?{' '}
                <Link href={path.login} strong>
                  Log in
                </Link>
              </p>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default RegisterForm
