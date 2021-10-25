import React from 'react'
import { Row, Col, Form, Input, Button, Alert, Typography } from 'antd'
import { ResendReset } from 'interfaces'
import { path } from 'helpers/path'

interface ResendCodeFormProps {
  values: ResendReset
  onSubmit(values: ResendReset): void
  btnLoad: boolean
  error: string | null
}

const { Title, Link } = Typography

const ResendCodeForm: React.FC<ResendCodeFormProps> = (props) => {
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
          Resend verification code
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
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={btnLoad}>
              {btnLoad ? 'Processing..' : 'Submit'}
            </Button>
          </Form.Item>
          <Row style={{ marginTop: '1.5rem' }}>
            <Col span={24}>
              Account already activated?{' '}
              <Link href={path.login} strong>
                Log in
              </Link>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default ResendCodeForm
