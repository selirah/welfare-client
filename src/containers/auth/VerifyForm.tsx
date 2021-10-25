import React from 'react'
import { Row, Col, Form, Input, Button, Alert, Typography } from 'antd'
import { VerificationFields } from 'interfaces'

interface VerifyFormProps {
  values: VerificationFields
  onSubmit(values: VerificationFields): void
  btnLoad: boolean
  error: string | null
}

const { Title } = Typography

const VerifyForm: React.FC<VerifyFormProps> = (props) => {
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
          Verify account
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
            label="Email"
            hasFeedback
            rules={[{ required: true, message: 'Email should be present' }]}
          >
            <Input placeholder="" disabled />
          </Form.Item>
          <Form.Item
            name="code"
            label="Code"
            rules={[
              { required: true, message: 'Please input your activation code!' }
            ]}
            hasFeedback
          >
            <Input placeholder="Enter your activation code.." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={btnLoad}>
              {btnLoad ? 'Processing..' : 'Verify account'}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default VerifyForm
