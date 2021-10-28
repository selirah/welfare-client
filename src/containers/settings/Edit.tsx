import { useState, useEffect } from 'react'
import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { Form, Button, Input, Row, Col, Alert, Typography, Select } from 'antd'
import { InstitutionField, PaymentTypes } from 'interfaces'
import { useStore } from 'hooks/StoreHook'
import { SaveOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { path } from 'helpers/path'
import { openNotification } from 'utils'

const { Text } = Typography

const { Option } = Select

const Edit = observer(() => {
  const { institutionStore } = useStore()
  const { institution } = institutionStore
  const [initValues] = useState<InstitutionField>({
    email: institution ? institution.email : '',
    location: institution ? institution.location : '',
    name: institution ? institution.name : '',
    payment_type: institution ? institution.payment_type : undefined,
    phone: institution ? institution.phone : '',
    sender_id: institution ? institution.sender_id : '',
    user_id: institution ? institution?.user_id : '',
    api_key: institution ? institution.api_key : '',
    id: institution ? institution.id : 0
  })
  const history = useHistory()

  const renderError = (error: any) => (
    <Alert
      type="error"
      message={error.message}
      style={{ marginBottom: '10px', marginTop: '10px' }}
    />
  )

  const onSubmit = (values: InstitutionField) => {
    institutionStore.update(values)
  }

  useEffect(() => {
    autorun(() => {
      if (institutionStore.success) {
        openNotification('success', 'Nice!', 'Institution updated successfully')
        history.push(path.settings)
      }
    })
  }, [history, institutionStore])

  return (
    <Col sm={24} md={24} lg={24}>
      <Row style={{ marginBottom: '15px' }}>
        <Text type="success" strong>
          Update Institution
        </Text>
      </Row>
      {institutionStore.error ? renderError(institutionStore.error) : null}
      <Form
        layout="vertical"
        name="basic"
        initialValues={initValues}
        onFinish={onSubmit}
      >
        <Row gutter={10}>
          <Col sm={24} md={12} lg={6}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Name is required' }]}
              hasFeedback
            >
              <Input placeholder="Name of institution.." />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={6}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Email is required' },
                {
                  type: 'email',
                  message: 'Enter a valid email'
                }
              ]}
              hasFeedback
            >
              <Input placeholder="Email of institution.." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col sm={24} md={12} lg={6}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input phone number'
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
              <Input placeholder="Enter phone number.." />
            </Form.Item>
          </Col>
          <Col sm={24} md={24} lg={6}>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: 'Please input location'
                }
              ]}
              hasFeedback
            >
              <Input placeholder="Enter location.." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col sm={24} md={12} lg={6}>
            <Form.Item
              label="Sender ID"
              name="sender_id"
              rules={[
                {
                  required: true,
                  message: 'Please input sender ID'
                }
              ]}
              hasFeedback
            >
              <Input placeholder="Enter sender ID.." />
            </Form.Item>
          </Col>
          <Col sm={24} md={24} lg={6}>
            <Form.Item label="API Key" name="api_key" hasFeedback>
              <Input placeholder="Enter API Key.." />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={12} lg={6}>
            <Form.Item
              label="Payment Type"
              name="payment_type"
              rules={[
                {
                  required: true,
                  message: 'Select payment type'
                }
              ]}
              hasFeedback
            >
              <Select placeholder="Select payment type">
                {PaymentTypes.map((p) => (
                  <Option value={p.value} key={p.value}>
                    {p.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={12} lg={6}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={institutionStore.isSubmitting}
                icon={<SaveOutlined />}
              >
                {institutionStore.isSubmitting ? 'Processing..' : 'Update'}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Col>
  )
})

export default Edit
